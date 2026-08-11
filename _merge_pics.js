/* Merge апгрейженных pic. node _merge_pics.js <dir>
   Каждый *.json — массив {id, html, cap?}. Обновляет PICS[id] (только существующие, kit-проверка html). Атомарно. */
const fs = require("fs");
const DIR = process.argv[2];
if (!DIR) { console.error("usage: node _merge_pics.js <dir>"); process.exit(1); }

const W = {}; global.window = W;
["cards.js","cards-extra.js","pics.js"].forEach(f => require("./" + f));
const ids = new Set([...(W.CARDS||[]), ...(W.CARDS_EXTRA||[])].map(c => c.id));
const P = W.PICS;

const FORBID = /<script|<\/script|<style|<img|<iframe|https?:\/\//i;
const errors = [];
const items = [];
fs.readdirSync(DIR).filter(f => f.endsWith(".json")).sort().forEach(f => {
  let arr; try { arr = JSON.parse(fs.readFileSync(DIR + "/" + f, "utf8")); }
  catch (e) { errors.push(`[${f}] невалидный JSON: ${e.message}`); return; }
  if (!Array.isArray(arr)) { errors.push(`[${f}] не массив`); return; }
  arr.forEach(e => items.push({ ...e, _file: f }));
});

const seen = new Set();
const clean = [];
let dups = 0;
for (const e of items) {
  const w = `[${e._file}] ${e.id || "<no-id>"}`;
  if (!e.id || !e.html) { errors.push(`${w}: нет id/html`); continue; }
  if (!ids.has(e.id)) { errors.push(`${w}: нет такой карточки`); continue; }
  if (!P[e.id]) { errors.push(`${w}: у карточки не было pic`); continue; }
  if (FORBID.test(e.html)) { errors.push(`${w}: запрещённый тег/ссылка в html`); continue; }
  if (seen.has(e.id)) { dups++; continue; }   // дубль — оставляем первую версию, не падаем
  seen.add(e.id); clean.push(e);
}
if (errors.length) {   // жёсткие ошибки (запрещённый тег / нет карточки) — ничего не пишем
  console.error("✗ ЖЁСТКИЕ ОШИБКИ (ничего не записано):");
  errors.forEach(x => console.error("  " + x));
  process.exit(1);
}
if (dups) console.log(`(дублей пропущено, оставлена первая версия: ${dups})`);

clean.forEach(e => { P[e.id] = e.cap ? { html: e.html, cap: e.cap } : { html: e.html, ...(P[e.id].cap ? { cap: P[e.id].cap } : {}) }; });
fs.writeFileSync("pics.js", "/* Концепт-картинки. */\nwindow.PICS = " + JSON.stringify(P, null, 1) + ";\n");
console.log(`✓ обновлено pic: ${clean.length}`);
