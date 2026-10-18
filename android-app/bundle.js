/* Собирает www/ для Android из файлов сайта (папка уровнем выше).
 * Берём ровно то, что подключает index.html, плюс лениво загружаемые скрипты.
 * НЕ берём: комнаты-поздравления (*-data.js и фото — по просьбе владельца), инструменты
 * сборки и проверки, service worker (в приложении файлы и так внутри APK). */
const fs = require("fs"), path = require("path");
const SRC = path.resolve(__dirname, ".."), OUT = path.join(__dirname, "www");
const LAZY = ["i18n-en.js", "kid-zero.js", "kid-svg.js", "kid-scenes.js", "kid-say.js"];
const NEVER = /^(hb|sing|qa|tmr)-data\.js$|-build\.js$|^(sw|swver|build|check|jd-harness)\.js$|^verify-/;
let html = fs.readFileSync(path.join(SRC, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
const files = [...new Set([...scripts, ...LAZY])].filter(f => !NEVER.test(f));
const miss = files.filter(f => !fs.existsSync(path.join(SRC, f)));
if (miss.length) { console.error("нет файлов:", miss.join(", ")); process.exit(1); }
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT);
for (const f of [...files, "manifest.json", "icon-192.png", "icon-512.png", "apple-touch-icon.png"]) fs.copyFileSync(path.join(SRC, f), path.join(OUT, f));
fs.copyFileSync(path.join(__dirname, "app-native.js"), path.join(OUT, "app-native.js"));
/* нативный слой — первым, до кода приложения: он объявляет jdNativeSave до первого вызова */
html = html.replace(/<script src="/, '<script src="app-native.js"></script>\n<script src="');
fs.writeFileSync(path.join(OUT, "index.html"), html);
const kb = fs.readdirSync(OUT).reduce((a, f) => a + fs.statSync(path.join(OUT, f)).size, 0) / 1024;
console.log(`✓ www: ${fs.readdirSync(OUT).length} файлов, ${Math.round(kb)} КБ (комнаты не включены)`);
