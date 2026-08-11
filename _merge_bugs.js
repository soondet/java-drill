/* Merge сниппетов «Найди баг». node _merge_bugs.js <dir>
   Каждый *.json — массив {id,t,code,options:[4],correct:0..3,why}. Дедуп по id. Атомарно по жёстким ошибкам. */
const fs = require("fs");
const DIR = process.argv[2];
if (!DIR) { console.error("usage: node _merge_bugs.js <dir>"); process.exit(1); }
const W = {}; global.window = W; require("./bugs.js");
W.BUGS = W.BUGS || [];
const existing = new Set(W.BUGS.map(b => b.id));
const FORBID = /<\/script|<script|<style|<iframe/i;
const errors = [], items = [];
fs.readdirSync(DIR).filter(f => f.endsWith(".json")).sort().forEach(f => {
  let arr; try { arr = JSON.parse(fs.readFileSync(DIR + "/" + f, "utf8")); }
  catch (e) { errors.push(`[${f}] невалидный JSON: ${e.message}`); return; }
  if (!Array.isArray(arr)) { errors.push(`[${f}] не массив`); return; }
  arr.forEach(e => items.push({ ...e, _file: f }));
});
const seen = new Set(); const clean = []; let dups = 0;
for (const e of items) {
  const w = `[${e._file}] ${e.id || "<no-id>"}`;
  if (!e.id || !e.t || !e.code || !e.why) { errors.push(`${w}: нет id/t/code/why`); continue; }
  if (!Array.isArray(e.options) || e.options.length !== 4) { errors.push(`${w}: нужно ровно 4 options`); continue; }
  if (typeof e.correct !== "number" || e.correct < 0 || e.correct > 3) { errors.push(`${w}: correct должен быть 0..3`); continue; }
  if (FORBID.test(e.code) || FORBID.test(e.options.join(" "))) { errors.push(`${w}: запрещённый тег в коде/опциях`); continue; }
  if (existing.has(e.id) || seen.has(e.id)) { dups++; continue; }
  seen.add(e.id); clean.push({ id:e.id, t:e.t, correct:e.correct, code:e.code, options:e.options, why:e.why });
}
if (errors.length) { console.error("✗ ЖЁСТКИЕ ОШИБКИ (ничего не записано):"); errors.forEach(x => console.error("  " + x)); process.exit(1); }
clean.forEach(b => W.BUGS.push(b));
fs.writeFileSync("bugs.js", '/* Режим «Найди баг»: сниппет Java с подсаженной ошибкой. window.BUGS. */\nwindow.BUGS = ' + JSON.stringify(W.BUGS, null, 1) + ";\n");
if (dups) console.log(`(дублей пропущено: ${dups})`);
console.log(`✓ добавлено багов: ${clean.length} | всего: ${W.BUGS.length}`);
