/* Заменить html существующих сцен по id. node _merge_scenes.js <scenes-out.json>
   scenes-out.json — массив {id, html}. Валидирует: запрещ.теги, баланс div, и CSS-aware
   (нет неопределённых классов / var(--…) / inline animation на несуществующий keyframe). Пропускает невалидные. */
const fs = require("fs");
const FILE = process.argv[2];
if (!FILE) { console.error("usage: node _merge_scenes.js <scenes-out.json>"); process.exit(1); }

// CSS-словарь из index.html
const idx = fs.readFileSync("index.html", "utf8");
const css = idx.slice(0, idx.indexOf("</style>"));
const defC = new Set([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map(m => m[1]));
const defV = new Set([...css.matchAll(/--([\w-]+)\s*:/g)].map(m => m[1]));
const defK = new Set([...css.matchAll(/@keyframes\s+([\w-]+)/g)].map(m => m[1]));

const W = {}; global.window = W; require("./principles.js");
const byId = {}; W.PRINCIPLES.forEach(p => byId[p.id] = p);

let arr;
try { arr = JSON.parse(fs.readFileSync(FILE, "utf8")); }
catch (e) { console.error("BAD JSON:", e.message); process.exit(1); }

const FORBID = /<script|<\/script|<style|<img|<iframe|https?:\/\//i;
let ok = 0, skipped = [];
for (const s of arr) {
  if (!s || !s.id || !s.html) { skipped.push((s && s.id || "?") + ":нет html"); continue; }
  if (!byId[s.id]) { skipped.push(s.id + ":нет такой сцены"); continue; }
  const h = s.html;
  if (FORBID.test(h)) { skipped.push(s.id + ":запрещ.тег"); continue; }
  const o = (h.match(/<div/g) || []).length, c = (h.match(/<\/div>/g) || []).length;
  if (o !== c) { skipped.push(s.id + ":несбаланс.div " + o + "/" + c); continue; }
  // CSS-aware: классы
  const cls = new Set([...h.matchAll(/class=["']([^"']+)["']/g)].flatMap(m => m[1].split(/\s+/)));
  const badC = [...cls].filter(x => x && !defC.has(x));
  if (badC.length) { skipped.push(s.id + ":неопредел.классы[" + badC.join(",") + "]"); continue; }
  // переменные
  const badV = [...new Set([...h.matchAll(/var\(--([\w-]+)/g)].map(m => m[1]))].filter(v => !defV.has(v));
  if (badV.length) { skipped.push(s.id + ":неопредел.var[" + badV.join(",") + "]"); continue; }
  // inline animation на несуществующий keyframe
  const badA = [...new Set([...h.matchAll(/animation:\s*([\w-]+)/g)].map(m => m[1]))].filter(a => !/^\d/.test(a) && a !== "none" && !defK.has(a));
  if (badA.length) { skipped.push(s.id + ":неопредел.animation[" + badA.join(",") + "]"); continue; }
  byId[s.id].html = h;
  if (s.title) byId[s.id].title = s.title;
  if (s.what) byId[s.id].what = s.what;
  ok++;
}

if (skipped.length) { console.log("⚠ пропущено (невалидны):", skipped.length); skipped.forEach(x => console.log("   " + x)); }
fs.writeFileSync("principles.js", "/* Раздел «Принцип» — живые схемы. window.PRINCIPLES. */\nwindow.PRINCIPLES = " + JSON.stringify(W.PRINCIPLES, null, 1) + ";\n");
console.log("✓ обновлено сцен: " + ok + " | всего: " + W.PRINCIPLES.length);
