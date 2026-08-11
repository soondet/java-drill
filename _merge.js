/* Переиспользуемый merge сгенерированного контента в файлы-сателлиты.
   Запуск: node _merge.js <dir-с-json> <ord-base>
   Каждый *.json в dir — массив «entry»:
   { id,t,s,ord,q,a,d?,code?, pic:{html,cap?}?, hook?, quiz:{correct,wrong[]}?, more?, note?, term:{term,def,icon?,hook?}? }
   Валидирует, дедупит по id, kit-проверяет html, дописывает во все файлы. Атомарно: при ошибке ничего не пишет. */
const fs = require("fs");
const path = require("path");

const DIR = process.argv[2];
const BASE = parseInt(process.argv[3] || "30000", 10);
if (!DIR) { console.error("usage: node _merge.js <dir> <ord-base>"); process.exit(1); }

// --- читаем существующие данные ---
const W = {};
global.window = W;
["cards.js","cards-extra.js","pics.js","hooks.js","quiz.js","more.js","notes.js","ord.js","terms.js","term-extra.js"]
  .forEach(f => { delete require.cache[require.resolve("./" + f)]; require("./" + f); });

const existingIds = new Set([...(W.CARDS||[]), ...(W.CARDS_EXTRA||[])].map(c => c.id));
const existingTerms = new Set((W.TERMS||[]).map(t => t.t + "|" + t.term));

// --- собираем entries ---
const files = fs.readdirSync(DIR).filter(f => f.endsWith(".json")).sort();
let entries = [];
const errors = [];
for (const f of files) {
  let arr;
  try { arr = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")); }
  catch (e) { errors.push(`[${f}] невалидный JSON: ${e.message}`); continue; }
  if (!Array.isArray(arr)) { errors.push(`[${f}] не массив`); continue; }
  arr.forEach(e => entries.push({ ...e, _file: f }));
}

// --- валидация ---
const FORBID = /<script|<\/script|<style|<img|<iframe|https?:\/\//i;
const seen = new Set();
const clean = [];
for (const e of entries) {
  const where = `[${e._file}] ${e.id||"<no-id>"}`;
  if (!e.id || typeof e.id !== "string") { errors.push(`${where}: нет id`); continue; }
  if (existingIds.has(e.id)) { errors.push(`${where}: id уже существует — пропуск`); continue; }
  if (seen.has(e.id)) { errors.push(`${where}: дубль id в генерации`); continue; }
  if (!e.t || !e.s || !e.q || !e.a) { errors.push(`${where}: нет t/s/q/a`); continue; }
  if (typeof e.ord !== "number") { errors.push(`${where}: нет числового ord`); continue; }
  if (e.pic && FORBID.test(e.pic.html || "")) { errors.push(`${where}: pic.html содержит запрещённый тег/ссылку`); continue; }
  if (e.quiz && (!e.quiz.correct || !Array.isArray(e.quiz.wrong) || e.quiz.wrong.length < 3)) { errors.push(`${where}: quiz неполный (нужен correct + 3 wrong)`); continue; }
  if (e.term && (!e.term.term || !e.term.def)) { errors.push(`${where}: term без term/def`); continue; }
  seen.add(e.id); clean.push(e);
}

if (errors.length) {
  console.error("✗ ОШИБКИ ВАЛИДАЦИИ (ничего не записано):");
  errors.forEach(x => console.error("  " + x));
  process.exit(1);
}

// --- применяем ---
W.CARDS_EXTRA = W.CARDS_EXTRA || [];
W.PICS = W.PICS || {}; W.HOOKS = W.HOOKS || {cards:{},fp:{}}; W.HOOKS.cards = W.HOOKS.cards||{};
W.QUIZ = W.QUIZ || {}; W.MORE = W.MORE || {}; W.NOTES = W.NOTES || {};
W.ORD = W.ORD || {cards:{},fp:{},terms:{}}; W.ORD.cards = W.ORD.cards||{};
W.TERMS = W.TERMS || []; W.TERM_EXTRA = W.TERM_EXTRA || {};

let nTerm = 0, nNote = 0;
clean.forEach(e => {
  const card = { id:e.id, t:e.t, s:e.s, q:e.q, a:e.a };
  if (e.d) card.d = e.d;
  if (e.code) card.code = e.code;
  W.CARDS_EXTRA.push(card);
  if (e.pic && e.pic.html) { W.PICS[e.id] = e.pic.cap ? {html:e.pic.html, cap:e.pic.cap} : {html:e.pic.html}; }
  if (e.hook) W.HOOKS.cards[e.id] = e.hook;
  if (e.quiz) W.QUIZ[e.id] = { q:e.q, correct:e.quiz.correct, wrong:e.quiz.wrong };
  if (e.more) W.MORE[e.id] = e.more;
  if (e.note) { W.NOTES[e.id] = e.note; nNote++; }
  W.ORD.cards[e.id] = BASE + e.ord;
  if (e.term) {
    const key = e.t + "|" + e.term.term;
    if (!existingTerms.has(key)) {
      W.TERMS.push({ t:e.t, term:e.term.term, def:e.term.def });
      W.TERM_EXTRA[key] = { icon: e.term.icon || "📌", hook: e.term.hook || e.hook || e.term.def };
      existingTerms.add(key); nTerm++;
    }
  }
});

// --- запись ---
const HEAD = {
  "cards-extra.js": "/* Доп. карточки. window.CARDS_EXTRA. */",
  "pics.js": "/* Концепт-картинки. */",
  "hooks.js": "/* Мнемоники. */",
  "quiz.js": "/* Викторина Блиц. */",
  "more.js": "/* Подробнее. */",
  "notes.js": "/* ⚠️ Нюансы по карточкам. window.NOTES (id → текст). */",
  "ord.js": "/* Порядок. */",
  "terms.js": "/* Словарь терминов: {t:кластер, term, def}. */",
  "term-extra.js": "/* Раскрытие термина: иконка+аналогия+мини-картинка. */",
};
const write = (file, varName, val) =>
  fs.writeFileSync(file, HEAD[file] + "\nwindow." + varName + " = " + JSON.stringify(val, null, 1) + ";\n");

write("cards-extra.js","CARDS_EXTRA", W.CARDS_EXTRA);
write("pics.js","PICS", W.PICS);
write("hooks.js","HOOKS", W.HOOKS);
write("quiz.js","QUIZ", W.QUIZ);
write("more.js","MORE", W.MORE);
write("notes.js","NOTES", W.NOTES);
write("ord.js","ORD", W.ORD);
write("terms.js","TERMS", W.TERMS);
write("term-extra.js","TERM_EXTRA", W.TERM_EXTRA);

console.log(`✓ merged: +${clean.length} карточек, +${nNote} нюансов, +${nTerm} терминов (ord base ${BASE})`);
console.log(`  итог карточек: ${(W.CARDS||[]).length + W.CARDS_EXTRA.length}`);
