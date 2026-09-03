#!/usr/bin/env node
/* Перевод разделов, которые идут через плоский tr(): ключ — точная русская строка.
   Переписывать ключи руками нельзя: одна опечатка — и перевод молча не подхватится.
   Поэтому русские строки берутся из выгрузки sections.json, а перевод подаётся
   массивом в том же порядке. Длина обязана совпадать — иначе всё поедет на строку.
   Запуск: node i18n-sec.js <раздел> <от> <en.json> */
const fs = require("fs");
const [, , section, fromArg, file] = process.argv;
if (!section || fromArg === undefined || !file) {
  console.error("нужно: node i18n-sec.js <раздел> <индекс-начала> <файл-с-переводом.json>"); process.exit(1);
}
const from = +fromArg;
const SEC = "/private/tmp/claude-501/-Users-soondet-Documents-WORK-BCC/2ee7edd4-c3db-43b4-a5d1-cae7f3c47019/scratchpad/sections.json";
const ru = JSON.parse(fs.readFileSync(SEC, "utf8"))[section];
if (!ru) { console.error("нет раздела " + section); process.exit(1); }
const en = JSON.parse(fs.readFileSync(file, "utf8"));
if (!Array.isArray(en)) { console.error("перевод должен быть массивом строк"); process.exit(1); }
if (from + en.length > ru.length) { console.error("выходит за границы: " + (from + en.length) + " > " + ru.length); process.exit(1); }

const src = fs.readFileSync("i18n-en.js", "utf8");
const at = src.search(/^window\.I18N\s*=\s*/m);
const eq = src.indexOf("=", at);
const head = src.slice(0, eq + 1) + " ";
const data = JSON.parse(src.slice(eq + 1).trim().replace(/;\s*$/, ""));
data.ui = data.ui || {};

let added = 0, same = 0;
for (let i = 0; i < en.length; i++) {
  const k = ru[from + i], v = en[i];
  if (typeof v !== "string" || !v.trim()) { console.error("пустой перевод на позиции " + (from + i)); process.exit(1); }
  if (k === v) same++;
  if (!(k in data.ui)) added++;
  data.ui[k] = v;
}
fs.writeFileSync("i18n-en.js", head + JSON.stringify(data) + ";\n");
console.log("  " + section + " [" + from + ".." + (from + en.length - 1) + "]: добавлено " + added
  + (same ? " · совпало с оригиналом: " + same + " (проверь)" : "")
  + " · всего в словаре " + Object.keys(data.ui).length + " из 2056");
