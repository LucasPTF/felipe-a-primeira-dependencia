import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { event } from "../src/content.js";

const baseUrl = process.env.SITE_URL || "http://127.0.0.1:4173";
assert.equal(event.dateIso, "2026-10-29T09:00:00-03:00");
const browser = await chromium.launch({ headless: true });

try {
  for (const width of [375, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 958 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.clock.setFixedTime(new Date("2026-10-07T09:00:00-03:00"));
    for (const route of ["/a1", "/a2", "/a3", "/obrigado"]) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      const text = await page.locator("#app").innerText();
      assert.ok(text.includes("29 de outubro de 2026, às 9h"), `Data nova ausente em ${route}`);
      assert.ok(!/Felipe|0[7] de outubro de 2026|0[7]\/10/.test(text), `Referência antiga em ${route}`);
      if (route !== "/obrigado") {
        assert.equal(await page.locator("[data-days]").innerText(), "22", `Contador incorreto em ${route}`);
        assert.equal(await page.locator(".section-authority h2").innerText(), "Sobre Alesandra Galdino");
        assert.equal(await page.getByRole("link", { name: "GARANTIR MEU INGRESSO PARA 29/10" }).getAttribute("href"), "#ingresso");
        await page.getByText("Quando acontece?", { exact: true }).click();
        assert.ok((await page.locator("details[open]").allInnerTexts()).some((value) => value.includes("Em 29 de outubro de 2026, às 9h.")));
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, `Overflow em ${route}, ${width}px`);
    }
    assert.deepEqual(errors, []);
    await page.close();
  }
} finally {
  await browser.close();
}
console.log("Nome, data, CTA, FAQ e contador verificados nas quatro rotas e quatro larguras.");
