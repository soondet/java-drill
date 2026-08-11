/* Merge EN-переводов в window.I18N. node _merge_i18n.js <dir>
   Каждый *.json — {kind:"cards|terms|fp|prin", map:{id_or_key:{...поля...}}}. */
const fs = require("fs");
const DIR = process.argv[2] || "/tmp/jd-gen/en";
// аддитивно: грузим уже существующие переводы как базу, дополняем новыми
let I18N = { cards:{}, terms:{}, fp:{}, prin:{}, bugs:{} };
try { const W={}; global.window=W; require("./i18n-en.js"); if(W.I18N){ I18N = { cards:W.I18N.cards||{}, terms:W.I18N.terms||{}, fp:W.I18N.fp||{}, prin:W.I18N.prin||{}, bugs:W.I18N.bugs||{} }; console.log("база: загружено существующих ключей", Object.values(I18N).reduce((s,o)=>s+Object.keys(o).length,0)); } } catch(e) {}
let files = 0, bad = 0, keys = 0;
fs.readdirSync(DIR).filter(f => f.endsWith(".json")).sort().forEach(f => {
  let o; try { o = JSON.parse(fs.readFileSync(DIR + "/" + f, "utf8")); }
  catch (e) { console.error("BAD JSON:", f, e.message); bad++; return; }
  if (!o || !o.kind || !o.map || !I18N[o.kind]) { console.error("skip (нет kind/map):", f); bad++; return; }
  for (const k of Object.keys(o.map)) { I18N[o.kind][k] = o.map[k]; keys++; }
  files++;
});
fs.writeFileSync("i18n-en.js", "/* EN-переводы контента. window.I18N = {cards,terms,fp,prin}. */\nwindow.I18N = " + JSON.stringify(I18N, null, 0) + ";\n");
console.log(`✓ i18n-en.js: файлов ${files}, ключей ${keys}, битых ${bad}`);
console.log(`  cards:${Object.keys(I18N.cards).length} terms:${Object.keys(I18N.terms).length} fp:${Object.keys(I18N.fp).length} prin:${Object.keys(I18N.prin).length}`);
