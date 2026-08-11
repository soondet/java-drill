/* Merge сцен «Принцип». node _merge_prin.js <dir>
   Каждый *.json — массив {id,t,title,what,html}. Дописывает в PRINCIPLES. Дубли — первый. Жёсткий запрет <style>/<script>/<img>/http. */
const fs = require("fs");
const DIR = process.argv[2];
if (!DIR) { console.error("usage: node _merge_prin.js <dir>"); process.exit(1); }
const W = {}; global.window = W; require("./principles.js");
W.PRINCIPLES = W.PRINCIPLES || [];
const existing = new Set(W.PRINCIPLES.map(p => p.id));
const FORBID = /<script|<\/script|<style|<img|<iframe|https?:\/\//i;
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
  if (!e.id || !e.t || !e.title || !e.what || !e.html) { errors.push(`${w}: нет id/t/title/what/html`); continue; }
  if (FORBID.test(e.html)) { errors.push(`${w}: запрещённый тег/ссылка (<style> в новых сценах нельзя)`); continue; }
  if (existing.has(e.id) || seen.has(e.id)) { dups++; continue; }
  seen.add(e.id); clean.push({ id:e.id, t:e.t, title:e.title, what:e.what, html:e.html });
}
if (errors.length) { console.error("✗ ЖЁСТКИЕ ОШИБКИ (ничего не записано):"); errors.forEach(x => console.error("  " + x)); process.exit(1); }
clean.forEach(e => W.PRINCIPLES.push(e));
fs.writeFileSync("principles.js", "/* Раздел «Принцип» — живые схемы. window.PRINCIPLES. */\nwindow.PRINCIPLES = " + JSON.stringify(W.PRINCIPLES, null, 1) + ";\n");
if (dups) console.log(`(дублей пропущено: ${dups})`);
console.log(`✓ добавлено сцен: ${clean.length} | всего: ${W.PRINCIPLES.length}`);
