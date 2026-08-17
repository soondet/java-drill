/* Сборка одного самодостаточного файла: инлайнит все <script src="*.js"> прямо в HTML.
   Запуск: node build.js  →  java-drill.html (один файл, можно скинуть и открыть на телефоне). */
const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");
let inlined = 0, missing = [];
html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => {
  try {
    let code = fs.readFileSync(src, "utf8");
    // Защита: любой литерал </script> внутри данных (в JS-строках) разорвал бы
    // тег при инлайне и сломал бы единый HTML. Экранируем — в JS это тот же текст.
    code = code.replace(/<\/script/gi, "<\\/script");
    inlined++;
    return "<script>\n" + code + "\n</script>";
  } catch (e) { missing.push(src); return m; }
});
// EN-пакет (~2.5МБ). По умолчанию НЕ инлайним — грузится лениво (loadEN) при переключении на EN,
// что режет стартовый парсинг на ~30%. Флаг --inline-en встраивает его для полностью портативного
// single-file (EN работает даже если носить только html без папки).
const inlineEN = process.argv.includes("--inline-en");
html = html.replace("<!--INLINE-I18N-EN-->", () => {
  if (!inlineEN) return "<!-- i18n-en.js грузится лениво (loadEN) при переключении на EN -->";
  try {
    const code = fs.readFileSync("i18n-en.js", "utf8").replace(/<\/script/gi, "<\\/script");
    inlined++;
    return "<script>\n" + code + "\n</script>";
  } catch (e) { missing.push("i18n-en.js"); return "<!--i18n-en.js НЕ НАЙДЕН-->"; }
});
// Данные комнат на сайте грузятся лениво (их 740 КБ, а открывают по паролю),
// но однофайловая сборка должна оставаться самодостаточной — вшиваем их сюда.
const ROOMS = ["hb-data.js", "sing-data.js", "qa-data.js"];
let roomKb = 0;
const roomTags = ROOMS.map(f => {
  try {
    const code = fs.readFileSync(f, "utf8").replace(/<\/script/gi, "<\\/script");
    roomKb += Buffer.byteLength(code) / 1024; inlined++;
    return "<script>\n" + code + "\n</script>";
  } catch (e) { return ""; }
}).filter(Boolean).join("\n");
if (roomTags) html = html.replace("</body>", roomTags + "\n</body>");

fs.writeFileSync("java-drill.html", html);

/* Service worker отдаёт файлы cache-first, а имя кэша раньше было зашито намертво —
   поэтому у того, кто уже заходил, обновления не доезжали вообще. Пересчитываем имя
   от содержимого: контент изменился → новое имя → activate сносит старый кэш. */
try {
  const crypto = require("crypto");
  let sw = fs.readFileSync("sw.js", "utf8");
  const assets = (sw.match(/const ASSETS=\[([^\]]*)\]/) || [, ""])[1]
    .split(",").map(s => s.trim().replace(/^"|"$/g, "")).filter(s => s && s !== "./");
  const h = crypto.createHash("sha1").update(html);
  for (const a of assets) { try { h.update(fs.readFileSync(a)); } catch (e) {} }
  const ver = "jd-" + h.digest("hex").slice(0, 10);
  const old = (sw.match(/const CACHE="([^"]+)"/) || [, ""])[1];
  if (old !== ver) {
    fs.writeFileSync("sw.js", sw.replace(/const CACHE="[^"]+"/, 'const CACHE="' + ver + '"'));
    console.log("  кэш sw.js:", old, "→", ver);
  }
} catch (e) { console.log("  ⚠ sw.js не обновлён:", e.message); }

const kb = Math.round(Buffer.byteLength(html) / 1024);
console.log("✓ java-drill.html собран:", kb + "KB, инлайнено скриптов:", inlined, "(комнаты +" + Math.round(roomKb) + "KB)", inlineEN ? "(EN встроен)" : "(EN ленивый — держи i18n-en.js рядом)");
if (missing.length) console.log("  не найдено (оставлены ссылками):", missing.join(", "));
