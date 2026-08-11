/* Дописать ⚠️-нюансы к СУЩЕСТВУЮЩИМ карточкам. node _merge_notes.js <notes.json>
   notes.json — массив {id, note(RU), en(EN)}. Добавляет в NOTES[id] и в I18N.cards[id].note (мёрджит, не затирая q/a/…).
   Дубли (нюанс уже есть) — пропускает. Только для существующих карточек. */
const fs = require("fs");
const FILE = process.argv[2];
if (!FILE) { console.error("usage: node _merge_notes.js <notes.json>"); process.exit(1); }

const W = {}; global.window = W;
["cards.js","cards-extra.js","notes.js","i18n-en.js"].forEach(f => require("./" + f));
const cardIds = new Set([...(W.CARDS||[]), ...(W.CARDS_EXTRA||[])].map(c => c.id));
W.NOTES = W.NOTES || {};
const I18N = W.I18N || { cards:{}, terms:{}, fp:{}, prin:{}, bugs:{} };
I18N.cards = I18N.cards || {};

let arr;
try { arr = JSON.parse(fs.readFileSync(FILE, "utf8")); }
catch (e) { console.error("BAD JSON:", e.message); process.exit(1); }
if (!Array.isArray(arr)) { console.error("не массив"); process.exit(1); }

let added = 0, skipExist = 0, skipNoCard = 0, en = 0;
const FORBID = /<script|<\/script|<style|<iframe/i;
for (const n of arr) {
  if (!n || !n.id || !n.note) continue;
  if (!cardIds.has(n.id)) { skipNoCard++; continue; }
  if (W.NOTES[n.id]) { skipExist++; continue; }
  if (FORBID.test(n.note)) { console.error("forbidden tag in note", n.id); continue; }
  W.NOTES[n.id] = n.note;
  added++;
  if (n.en) { I18N.cards[n.id] = Object.assign({}, I18N.cards[n.id] || {}, { note: n.en }); en++; }
}

fs.writeFileSync("notes.js", "/* ⚠️ Нюансы по карточкам. window.NOTES (id → текст). */\nwindow.NOTES = " + JSON.stringify(W.NOTES, null, 1) + ";\n");
fs.writeFileSync("i18n-en.js", "/* EN-переводы контента. window.I18N = {cards,terms,fp,prin,bugs}. */\nwindow.I18N = " + JSON.stringify(I18N, null, 0) + ";\n");
console.log(`✓ нюансов добавлено: ${added} | EN: ${en} | пропущено (уже есть): ${skipExist} | нет карточки: ${skipNoCard}`);
console.log(`  итог NOTES: ${Object.keys(W.NOTES).length}`);
