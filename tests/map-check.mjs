import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.SITE_URL || "http://127.0.0.1:4173";
const cases = [
  { width: 375, height: 812, mode: "mobile" },
  { width: 768, height: 1024, mode: "desktop" },
  { width: 1294, height: 958, mode: "desktop" },
  { width: 1440, height: 1000, mode: "desktop" },
];
const coordinates = {
  desktop: [
    [75 / 520, 390 / 480],
    [165 / 520, 275 / 480],
    [260 / 520, 380 / 480],
    [365 / 520, 220 / 480],
    [420 / 520, 95 / 480],
  ],
  mobile: [
    [70 / 320, 95 / 480],
    [225 / 320, 175 / 480],
    [80 / 320, 255 / 480],
    [225 / 320, 335 / 480],
    [110 / 320, 420 / 480],
  ],
};

await mkdir(resolve("validation"), { recursive: true });
const browser = await chromium.launch({ headless: true });

for (const testCase of cases) {
  const page = await browser.newPage({ viewport: testCase });
  await page.goto(`${baseUrl}/a1`, { waitUntil: "networkidle" });
  const map = page.locator(".operational-map");
  await map.screenshot({ path: resolve("validation", `map-${testCase.width}.png`) });

  const mapBox = await map.boundingBox();
  const nodeBoxes = await page.locator(".map-node").evaluateAll((nodes) =>
    nodes.map((node) => {
      const box = node.getBoundingClientRect();
      return { x: box.x, y: box.y, width: box.width, height: box.height };
    }),
  );

  assert.ok(mapBox, `Mapa ausente em ${testCase.width}px`);
  nodeBoxes.forEach((box, index) => {
    const [xRatio, yRatio] = coordinates[testCase.mode][index];
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    assert.ok(Math.abs(centerX - (mapBox.x + mapBox.width * xRatio)) < 3, `Etapa ${index + 1} fora do traço em ${testCase.width}px`);
    assert.ok(Math.abs(centerY - (mapBox.y + mapBox.height * yRatio)) < 3, `Etapa ${index + 1} fora do traço em ${testCase.width}px`);
    assert.ok(box.x >= mapBox.x && box.y >= mapBox.y, `Etapa ${index + 1} extrapola o início do mapa`);
    assert.ok(box.x + box.width <= mapBox.x + mapBox.width && box.y + box.height <= mapBox.y + mapBox.height, `Etapa ${index + 1} extrapola o fim do mapa`);
  });

  const orbitGeometry = await page.locator(".live-orbit").evaluate((orbit) => {
    const orbitBox = orbit.getBoundingClientRect();
    const centerX = orbitBox.x + orbitBox.width / 2;
    const centerY = orbitBox.y + orbitBox.height / 2;
    return [...orbit.querySelectorAll(".orbit-track")].map((track) => {
      const dotBox = track.querySelector("span").getBoundingClientRect();
      const dotX = dotBox.x + dotBox.width / 2;
      const dotY = dotBox.y + dotBox.height / 2;
      return {
        radius: track.offsetWidth / 2,
        distance: Math.hypot(dotX - centerX, dotY - centerY),
      };
    });
  });
  orbitGeometry.forEach((orbit, index) => {
    assert.ok(Math.abs(orbit.distance - orbit.radius) < 3, `Ponto ${index + 1} fora da órbita em ${testCase.width}px`);
  });

  const mappSpacing = await page.locator(".mapp-route li").evaluateAll((items) =>
    items.map((item) => {
      const marker = item.querySelector(".route-marker").getBoundingClientRect();
      const title = item.querySelector("strong").getBoundingClientRect();
      return { markerBottom: marker.bottom, titleTop: title.top };
    }),
  );
  if (testCase.width > 560) {
    mappSpacing.forEach((item, index) => assert.ok(item.titleTop >= item.markerBottom + 8, `Texto MAPP invade o traço na etapa ${index + 1} em ${testCase.width}px`));
  }

  if (testCase.width === 1294 || testCase.width === 375) {
    for (const selector of [".live-grid", ".mapp-route", ".lotes-wrap", ".route-grid"]) {
      const name = selector.replace(/^[.#]/, "").replace(/[^a-z0-9]+/gi, "-");
      await page.locator(selector).screenshot({ path: resolve("validation", `${name}-${testCase.width}.png`) });
    }
  }

  for (let first = 0; first < nodeBoxes.length; first += 1) {
    for (let second = first + 1; second < nodeBoxes.length; second += 1) {
      const a = nodeBoxes[first];
      const b = nodeBoxes[second];
      const overlaps = a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
      assert.equal(overlaps, false, `Etapas ${first + 1} e ${second + 1} se sobrepõem em ${testCase.width}px`);
    }
  }

  await page.close();
}

const reducedPage = await browser.newPage({ viewport: { width: 1294, height: 958 }, reducedMotion: "reduce" });
await reducedPage.goto(`${baseUrl}/a1`, { waitUntil: "networkidle" });
assert.equal(await reducedPage.locator(".map-path-flow").first().evaluate((node) => getComputedStyle(node).animationName), "none");
assert.equal(await reducedPage.locator(".orbit-track").first().evaluate((node) => getComputedStyle(node).animationName), "none");
assert.equal(await reducedPage.locator(".route-path-flow").evaluate((node) => getComputedStyle(node).animationName), "none");
await browser.close();

console.log("Mapa validado: etapas ancoradas ao traço, sem sobreposição e com redução de movimento.");
