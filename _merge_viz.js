/* Обновить визуалы по id: pics (html+cap) и fp-кадры (html, число кадров неизменно).
   node _merge_viz.js <viz-out.json>   — {pics:[{id,html,cap}], fp:[{id,frames:[html...]}]}
   CSS-aware валидация: запрещ.теги, баланс div, неопределённые классы/var/animation. Пропускает невалидные. */
const fs = require("fs");
const FILE = process.argv[2];
if (!FILE) { console.error("usage: node _merge_viz.js <viz-out.json>"); process.exit(1); }

const idx = fs.readFileSync("index.html", "utf8");
const css = idx.slice(0, idx.indexOf("</style>"));
const defC = new Set([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map(m => m[1]));
defC.add("name");
const defV = new Set([...css.matchAll(/--([\w-]+)\s*:/g)].map(m => m[1]));
const defK = new Set([...css.matchAll(/@keyframes\s+([\w-]+)/g)].map(m => m[1]));
const FORBID = /<script|<\/script|<style|<img|<iframe|https?:\/\//i;

function validate(id, h) {
  if (FORBID.test(h)) return id + ":запрещ.тег";
  const o = (h.match(/<div/g) || []).length, c = (h.match(/<\/div>/g) || []).length;
  if (o !== c) return id + ":несбаланс.div " + o + "/" + c;
  const cls = new Set([...h.matchAll(/class=["']([^"']+)["']/g)].flatMap(m => m[1].split(/\s+/)));
  const badC = [...cls].filter(x => x && !defC.has(x));
  if (badC.length) return id + ":неопредел.классы[" + badC.join(",") + "]";
  const badV = [...new Set([...h.matchAll(/var\(--([\w-]+)/g)].map(m => m[1]))].filter(v => !defV.has(v));
  if (badV.length) return id + ":неопредел.var[" + badV.join(",") + "]";
  const badA = [...new Set([...h.matchAll(/animation:\s*([\w-]+)/g)].map(m => m[1]))].filter(a => !/^\d/.test(a) && a !== "none" && !defK.has(a));
  if (badA.length) return id + ":inline-animation[" + badA.join(",") + "]";
  return null;
}

const W = {}; global.window = W;
["pics.js", "explainers.js"].forEach(f => require("./" + f));

let data;
try { data = JSON.parse(fs.readFileSync(FILE, "utf8")); }
catch (e) { console.error("BAD JSON:", e.message); process.exit(1); }

let okP = 0, okF = 0; const skipped = [];
for (const p of (data.pics || [])) {
  if (!p || !p.id || !p.html || !W.PICS[p.id]) { skipped.push((p && p.id || "?") + ":нет pic"); continue; }
  const err = validate(p.id, p.html); if (err) { skipped.push(err); continue; }
  W.PICS[p.id] = p.cap ? { html: p.html, cap: p.cap } : { html: p.html };
  okP++;
}
for (const f of (data.fp || [])) {
  const e = (W.EXPLAINERS || []).find(x => x.id === f.id);
  if (!e) { skipped.push((f && f.id || "?") + ":нет fp"); continue; }
  if (!Array.isArray(f.frames) || f.frames.length !== e.frames.length) { skipped.push(f.id + ":число кадров " + (f.frames || []).length + "≠" + e.frames.length); continue; }
  const errs = f.frames.map((h, i) => validate(f.id + "#" + i, h)).filter(Boolean);
  if (errs.length) { skipped.push(...errs); continue; }
  e.frames.forEach((fr, i) => { fr.html = f.frames[i]; });
  okF++;
}

if (skipped.length) { console.log("⚠ пропущено:", skipped.length); skipped.forEach(x => console.log("   " + x)); }
fs.writeFileSync("pics.js", "/* Концепт-картинки. */\nwindow.PICS = " + JSON.stringify(W.PICS, null, 1) + ";\n");
fs.writeFileSync("explainers.js", "/* Объяснения на пальцах — по подгруппам (g). */\nwindow.EXPLAINERS = " + JSON.stringify(W.EXPLAINERS, null, 1) + ";\n");
console.log("✓ обновлено pics: " + okP + " | fp: " + okF);
