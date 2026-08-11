/* Merge «пальцев» (storyboards). node _merge_fp.js <dir> <ordBase>
   Каждый *.json — массив {id,t,g,title,ord,frames:[{cap,html}],hook,more}.
   Дописывает в EXPLAINERS, HOOKS.fp, MORE_FP, ORD.fp. Дубли id — оставляем первый. Атомарно по жёстким ошибкам. */
const fs = require("fs");
const DIR = process.argv[2];
const BASE = parseInt(process.argv[3] || "20000", 10);
if (!DIR) { console.error("usage: node _merge_fp.js <dir> <ordBase>"); process.exit(1); }

const W = {}; global.window = W;
["explainers.js","hooks.js","more-fp.js","ord.js"].forEach(f => require("./" + f));
W.EXPLAINERS = W.EXPLAINERS || [];
W.HOOKS = W.HOOKS || { cards:{}, fp:{} }; W.HOOKS.fp = W.HOOKS.fp || {};
W.MORE_FP = W.MORE_FP || {};
W.ORD = W.ORD || { cards:{}, fp:{}, terms:{} }; W.ORD.fp = W.ORD.fp || {};

const existing = new Set(W.EXPLAINERS.map(e => e.id));
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
  if (!e.id || !e.t || !e.g || !e.title) { errors.push(`${w}: нет id/t/g/title`); continue; }
  if (!Array.isArray(e.frames) || e.frames.length < 4) { errors.push(`${w}: нужно >=4 кадров`); continue; }
  let bad = false;
  e.frames.forEach((fr, i) => {
    if (!fr || !fr.html || !fr.cap) { errors.push(`${w}: кадр ${i} без html/cap`); bad = true; }
    else if (FORBID.test(fr.html)) { errors.push(`${w}: кадр ${i} запрещённый тег/ссылка`); bad = true; }
  });
  if (bad) continue;
  if (existing.has(e.id) || seen.has(e.id)) { dups++; continue; }
  seen.add(e.id); clean.push(e);
}
if (errors.length) {
  console.error("✗ ЖЁСТКИЕ ОШИБКИ (ничего не записано):");
  errors.forEach(x => console.error("  " + x));
  process.exit(1);
}

clean.forEach(e => {
  W.EXPLAINERS.push({ id:e.id, t:e.t, g:e.g, title:e.title, frames:e.frames.map(fr => ({ cap:fr.cap, html:fr.html })) });
  if (e.hook) W.HOOKS.fp[e.id] = e.hook;
  if (e.more) W.MORE_FP[e.id] = e.more;
  W.ORD.fp[e.id] = BASE + (typeof e.ord === "number" ? e.ord : 0);
});

const write = (file, head, varName, val) => fs.writeFileSync(file, head + "\nwindow." + varName + " = " + JSON.stringify(val, null, 1) + ";\n");
write("explainers.js", "/* Объяснения на пальцах — по подгруппам (g). */", "EXPLAINERS", W.EXPLAINERS);
write("hooks.js", "/* Мнемоники. */", "HOOKS", W.HOOKS);
write("more-fp.js", "/* Подробнее для «На пальцах». window.MORE_FP[id]=текст. */", "MORE_FP", W.MORE_FP);
write("ord.js", "/* Порядок. */", "ORD", W.ORD);
if (dups) console.log(`(дублей пропущено: ${dups})`);
console.log(`✓ добавлено пальцев: ${clean.length} | всего: ${W.EXPLAINERS.length}`);
