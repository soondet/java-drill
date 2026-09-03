#!/usr/bin/env node
/* Дописывает хвост к самому длинному неверному варианту английской викторины.
   Нужно затем же, зачем TAIL в quiz-fix.js для русского: если верный ответ самый
   длинный, викторина проходится линейкой. Английский текст короче русского, поэтому
   правило, соблюдённое в оригинале, в переводе переворачивается — замер дал 644 из 818.
   Файл партии: { "card-id": " хвост", ... }. Хвост обязан грамматически продолжать
   существующий текст: в русском варианте склейки вслепую дали 107 сломанных фраз.
   Запуск: node i18n-tail.js batch.json */
const fs = require("fs");
const file = process.argv[2];
if (!file) { console.error("нужно: node i18n-tail.js <файл.json>"); process.exit(1); }

const src = fs.readFileSync("i18n-en.js", "utf8");
const at = src.search(/^window\.I18N\s*=\s*/m);
const eq = src.indexOf("=", at);
const head = src.slice(0, eq + 1) + " ";
const data = JSON.parse(src.slice(eq + 1).trim().replace(/;\s*$/, ""));

const add = JSON.parse(fs.readFileSync(file, "utf8"));
let done = 0, skip = [];
for (const id of Object.keys(add)) {
  const e = data.cards && data.cards[id];
  if (!e || !e.quizCorrect || !Array.isArray(e.quizWrong)) { skip.push(id + " (нет записи)"); continue; }
  let i = 0;
  for (let k = 1; k < e.quizWrong.length; k++) if (e.quizWrong[k].length > e.quizWrong[i].length) i = k;
  e.quizWrong[i] = e.quizWrong[i] + add[id];
  if (e.quizWrong[i].length <= e.quizCorrect.length) skip.push(id + " (всё ещё коротко)");
  done++;
}
fs.writeFileSync("i18n-en.js", head + JSON.stringify(data) + ";\n");
console.log("  дописано: " + done + (skip.length ? " · внимание: " + skip.join(", ") : " · все длиннее верного ✓"));
