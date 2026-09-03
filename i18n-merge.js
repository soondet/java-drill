#!/usr/bin/env node
/* Слияние партии переводов в i18n-en.js.
   Пакет — одна строка `window.I18N = {...}`, руками её не правят: разбираем,
   доливаем, пишем обратно. Раздел задаётся первым аргументом (cards | ui | terms…),
   файл партии — вторым.
   Запуск: node i18n-merge.js cards batch1.json */
const fs = require("fs");
const [, , section, file] = process.argv;
if (!section || !file) { console.error("нужно: node i18n-merge.js <раздел> <файл.json>"); process.exit(1); }

const src = fs.readFileSync("i18n-en.js", "utf8");
/* Привязываемся к настоящему присваиванию в начале строки: слова «window.I18N»
   встречаются ещё и в шапочном комментарии, и ленивый шаблон цеплялся за него. */
const at = src.search(/^window\.I18N\s*=\s*/m);
if (at < 0) { console.error("не нашёл присваивание window.I18N"); process.exit(1); }
const eq = src.indexOf("=", at);
const head = src.slice(0, eq + 1) + " ";
const data = JSON.parse(src.slice(eq + 1).trim().replace(/;\s*$/, ""));

const add = JSON.parse(fs.readFileSync(file, "utf8"));
data[section] = data[section] || {};
let added = 0, replaced = 0;
/* Долить ПОЛЯ, а не заменить запись. Раньше здесь было присваивание целиком, и
   партия с одним полем note стирала у карточки уже переведённые q, a, more и
   викторину — проверено, семнадцать штук разом. */
for (const k of Object.keys(add)) {
  const cur = data[section][k];
  if (cur && typeof cur === "object" && !Array.isArray(cur) && typeof add[k] === "object" && !Array.isArray(add[k])) {
    let touched = 0;
    for (const f of Object.keys(add[k])) { if (!(f in cur)) touched++; cur[f] = add[k][f]; }
    if (touched) added++; else replaced++;
  } else {
    (k in data[section]) ? replaced++ : added++;
    data[section][k] = add[k];
  }
}

fs.writeFileSync("i18n-en.js", head + JSON.stringify(data) + ";\n");
console.log("  раздел " + section + ": добавлено " + added + ", заменено " + replaced
  + " · всего в разделе " + Object.keys(data[section]).length);
