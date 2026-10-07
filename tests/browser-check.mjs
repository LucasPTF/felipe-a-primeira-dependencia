import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const baseUrl = process.env.SITE_URL || "http://127.0.0.1:4173";
const expectedHeroes = {
  "/a1": "Organize a primeira dependência.",
  "/a2": "Delegar tarefa não delega decisão.",
  "/a3": "Autonomia precisa de critério.",
};

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const sharedCopies = [];

for (const [route, title] of Object.entries(expectedHeroes)) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("h1").count(), 1, `${route} precisa de um único h1`);
  assert.equal((await page.locator("h1").innerText()).trim(), title, `Hero divergente em ${route}`);
  assert.equal(await page.locator('a[href="#ingresso"]').count() >= 4, true, `CTAs seguros ausentes em ${route}`);
  assert.equal(await page.locator(".section-problem").isVisible(), true, `Conteúdo principal oculto em ${route}`);
  assert.equal(await page.locator(".lote-card").count(), 3, `Comparação de lotes incompleta em ${route}`);
  assert.equal((await page.locator(".lote-card.is-current > span").innerText()).trim(), "LOTE 1", `Lote atual incorreto em ${route}`);
  assert.equal((await page.locator(".lote-card.is-current small").innerText()).trim(), "Atual", `Estado do lote 1 incorreto em ${route}`);
  const currentPrice = (await page.locator(".lote-card.is-current strong").innerText()).trim();
  assert.equal(currentPrice, "R$ 29,90", `Preço do lote vigente incorreto em ${route}`);
  for (const selector of [".header-cta", ".ticket-body > strong", ".final-card > strong"]) {
    assert.equal((await page.locator(selector).innerText()).trim(), currentPrice, `Investimento diverge do lote vigente em ${route}: ${selector}`);
  }
  assert.equal((await page.locator(".price-note").innerText()).trim(), `ingresso: ${currentPrice}`);
  assert.ok((await page.locator(".faq-list").textContent()).includes(`ingresso de ${currentPrice}?`));
  assert.ok((await page.locator(".faq-list").textContent()).includes(`${currentPrice} para o workshop ao vivo.`));
  if (route !== "/a1") assert.ok((await page.locator(".hero-actions a").innerText()).trim().endsWith(currentPrice));

  const shared = await page.locator("main > section:not(.hero):not(.event-bar)").allInnerTexts();
  sharedCopies.push(shared.join("\n").replace(/\s+/g, " ").trim());

  await page.keyboard.press("Home");
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(":focus").evaluate((node) => node.tagName), "A", `Foco inicial inválido em ${route}`);
}

assert.equal(sharedCopies[1], sharedCopies[0], "As seções compartilhadas divergem entre a1 e a2");
assert.equal(sharedCopies[2], sharedCopies[0], "As seções compartilhadas divergem entre a1 e a3");

await page.goto(`${baseUrl}/obrigado`, { waitUntil: "networkidle" });
assert.equal((await page.locator("h1").innerText()).trim(), "Inscrição confirmada.");
assert.equal(await page.locator("text=29 de outubro de 2026, às 9h").isVisible(), true);

await browser.close();
console.log("Validação no navegador concluída: copy compartilhada, foco, CTAs, lotes e rota de confirmação.");
