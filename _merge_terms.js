/* Merge терминов. node _merge_terms.js <dir> <ordBase>
   Каждый *.json — массив {t,term,def,icon,hook,pic,more,ord}. Дописывает TERMS, TERM_EXTRA, MORE_TERM, ORD.terms. Дубли по ключу t|term — пропуск. */
const fs = require("fs");
const DIR = process.argv[2];
const BASE = parseInt(process.argv[3] || "1000", 10);
if (!DIR) { console.error("usage: node _merge_terms.js <dir> <ordBase>"); process.exit(1); }
const W = {}; global.window = W;
["terms.js","term-extra.js","more-term.js","ord.js"].forEach(f => require("./" + f));
W.TERMS = W.TERMS || []; W.TERM_EXTRA = W.TERM_EXTRA || {}; W.MORE_TERM = W.MORE_TERM || {};
W.ORD = W.ORD || { cards:{}, fp:{}, terms:{} }; W.ORD.terms = W.ORD.terms || {};
const existing = new Set(W.TERMS.map(t => t.t + "|" + t.term));
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
  const w = `[${e._file}] ${(e.term)||"<no-term>"}`;
  if (!e.t || !e.term || !e.def) { errors.push(`${w}: нет t/term/def`); continue; }
  if (e.pic && FORBID.test(e.pic)) { errors.push(`${w}: pic запрещённый тег/ссылка`); continue; }
  const key = e.t + "|" + e.term;
  if (existing.has(key) || seen.has(key)) { dups++; continue; }
  seen.add(key); clean.push({ ...e, key });
}
if (errors.length) { console.error("✗ ЖЁСТКИЕ ОШИБКИ (ничего не записано):"); errors.forEach(x => console.error("  " + x)); process.exit(1); }
let i = 0;
clean.forEach(e => {
  W.TERMS.push({ t:e.t, term:e.term, def:e.def });
  W.TERM_EXTRA[e.key] = { icon: e.icon || "📌", hook: e.hook || e.def, ...(e.pic ? { pic: e.pic } : {}) };
  if (e.more) W.MORE_TERM[e.key] = e.more;
  W.ORD.terms[e.key] = BASE + (typeof e.ord === "number" ? e.ord : i);
  i++;
});
const write = (file, head, varName, val) => fs.writeFileSync(file, head + "\nwindow." + varName + " = " + JSON.stringify(val, null, 1) + ";\n");
write("terms.js", "/* Словарь терминов: {t:кластер, term, def}. */", "TERMS", W.TERMS);
write("term-extra.js", "/* Раскрытие термина: иконка+аналогия+мини-картинка. */", "TERM_EXTRA", W.TERM_EXTRA);
write("more-term.js", '/* Подробнее для терминов. window.MORE_TERM["кластер|термин"]=текст. */', "MORE_TERM", W.MORE_TERM);
write("ord.js", "/* Порядок. */", "ORD", W.ORD);
if (dups) console.log(`(дублей пропущено: ${dups})`);
console.log(`✓ добавлено терминов: ${clean.length} | всего: ${W.TERMS.length}`);
