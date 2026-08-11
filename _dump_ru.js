/* Дамп среза RU-контента для перевода.
   node _dump_ru.js "<кластер>" <kind> <offset> <limit>   kind: cards|terms|fp|prin
   node _dump_ru.js __ui__                                 — UI-строки и имена кластеров (один раз) */
const W = {}; global.window = W;
["cards.js","cards-extra.js","pics.js","hooks.js","quiz.js","more.js","notes.js","terms.js","term-extra.js","more-term.js","explainers.js","more-fp.js","principles.js"].forEach(f => require("./" + f));

const CL = process.argv[2];
if (CL === "__ui__") {
  const clusters = [...new Set([...(W.CARDS||[]), ...(W.CARDS_EXTRA||[])].map(c => c.t))];
  console.log(JSON.stringify({ kind: "ui", clusters }));
  process.exit(0);
}
const kind = process.argv[3];
const off = parseInt(process.argv[4] || "0", 10);
const lim = parseInt(process.argv[5] || "9999", 10);

const C = [...(W.CARDS||[]), ...(W.CARDS_EXTRA||[])].filter(c => c.t === CL);
let items = [];
if (kind === "cards") items = C.map(c => ({
  id: c.id, q: c.q, a: c.a, d: c.d || "",
  note: (W.NOTES||{})[c.id] || "",
  hook: (W.HOOKS && W.HOOKS.cards && W.HOOKS.cards[c.id]) || "",
  more: (W.MORE||{})[c.id] || "",
  quizCorrect: (W.QUIZ[c.id] && W.QUIZ[c.id].correct) || "",
  quizWrong: (W.QUIZ[c.id] && W.QUIZ[c.id].wrong) || [],
  picCap: (W.PICS[c.id] && W.PICS[c.id].cap) || "",
}));
else if (kind === "terms") items = (W.TERMS||[]).filter(t => t.t === CL).map(t => {
  const key = t.t + "|" + t.term;
  return { key, term: t.term, def: t.def, hook: (W.TERM_EXTRA[key] && W.TERM_EXTRA[key].hook) || "", more: (W.MORE_TERM||{})[key] || "" };
});
else if (kind === "fp") items = (W.EXPLAINERS||[]).filter(e => e.t === CL).map(e => ({
  id: e.id, title: e.title, g: e.g,
  hook: (W.HOOKS && W.HOOKS.fp && W.HOOKS.fp[e.id]) || "",
  more: (W.MORE_FP||{})[e.id] || "",
  caps: (e.frames||[]).map(f => f.cap || ""),
}));
else if (kind === "prin") items = (W.PRINCIPLES||[]).filter(p => p.t === CL).map(p => ({ id: p.id, title: p.title, what: p.what }));

console.log(JSON.stringify({ cluster: CL, kind, offset: off, items: items.slice(off, off + lim) }));
