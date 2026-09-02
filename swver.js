/* Имя кэша service worker — это хэш от собранной страницы и от всех файлов, которые
   он предзагружает. Изменилось содержимое → новое имя → install качает заново,
   activate сносит старое. На этом держится доставка обновлений, поэтому фоновая
   перепроверка каждого файла в sw.js не нужна.
   Формула нужна в двух местах: build.js её проставляет, check.js сторожит, что
   проставлена свежая. Живёт здесь, чтобы они не разъехались. */
const fs = require("fs"), path = require("path"), crypto = require("crypto");

module.exports = function swVer(html, swText, dir) {
  const base = dir || process.cwd();
  const assets = (swText.match(/const ASSETS=\[([^\]]*)\]/) || [, ""])[1]
    .split(",").map(s => s.trim().replace(/^"|"$/g, "")).filter(s => s && s !== "./");
  const h = crypto.createHash("sha1").update(html);
  for (const a of assets) { try { h.update(fs.readFileSync(path.join(base, a))); } catch (e) {} }
  return "jd-" + h.digest("hex").slice(0, 10);
};
