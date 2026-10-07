import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const content = await readFile(new URL("../src/content.js", import.meta.url), "utf8");
const main = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
const vercel = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));

assert.equal((content.match(/^  a\d:/gm) || []).length, 3, "A copy final exige três ângulos");
for (const route of ["/a1", "/a2", "/a3", "/obrigado"]) {
  assert.ok(vercel.rewrites.some((entry) => entry.source === route), `Rota ausente: ${route}`);
}

for (const required of [
  "Organize a primeira dependência.",
  "Delegar tarefa não delega decisão.",
  "Autonomia precisa de critério.",
  "R$ 197",
  "29 de outubro de 2026, às 9h",
]) {
  assert.ok(content.includes(required), `Copy obrigatória ausente: ${required}`);
}

for (const forbidden of ["checkout.example"]) {
  assert.ok(!main.toLowerCase().includes(forbidden.toLowerCase()), `Texto provisório encontrado: ${forbidden}`);
}
assert.ok(!/\bTODO\b/.test(main), "Marcador TODO encontrado");

assert.ok(main.includes('href="#ingresso"'), "CTAs sem checkout devem usar destino interno seguro");
console.log("Validação técnica concluída: 3 ângulos, 4 rotas e integrações seguras.");
