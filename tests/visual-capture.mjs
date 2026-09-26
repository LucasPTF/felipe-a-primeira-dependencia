import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";
const output = resolve("validation");
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "notebook", width: 1024, height: 900 },
  { name: "desktop", width: 1440, height: 1000 },
];
const routes = ["a1", "a2", "a3", "obrigado"];
const results = [];

await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });

for (const viewport of viewports) {
  for (const route of routes) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: route === "a3" ? "reduce" : "no-preference",
    });
    const errors = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${baseURL}/${route}`, { waitUntil: "networkidle" });
    await page.screenshot({ path: resolve(output, `${route}-${viewport.name}.png`), fullPage: true });
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      title: document.title,
      headings: document.querySelectorAll("h1, h2, h3").length,
      buttons: document.querySelectorAll("a.button").length,
    }));
    results.push({ route, viewport: viewport.name, ...metrics, errors });
    await page.close();
  }
}

await browser.close();
await writeFile(resolve(output, "visual-results.json"), JSON.stringify(results, null, 2));

const failures = results.filter(
  (result) => result.scrollWidth > result.clientWidth || result.errors.length > 0,
);
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(results, null, 2));
