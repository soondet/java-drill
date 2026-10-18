/* Нативный слой Android-приложения (Capacitor). Подключается только в сборке APK, на сайте его нет.
 * 1) кнопка «Назад»: окно сценки → любое окно/меню (как Esc) → на главную → второй «Назад» = выход;
 * 2) сохранение бэкапа: WebView не скачивает по ссылке — пишем файл и открываем «Поделиться»;
 * 3) светлые значки строки состояния на тёмном фоне. */
(function () {
  var C = window.Capacitor; if (!C || !C.isNativePlatform || !C.isNativePlatform()) return;
  var P = C.Plugins || {}, App = P.App, FS = P.Filesystem, Share = P.Share, SB = P.SystemBars || P.StatusBar;
  document.documentElement.classList.add("native-app");
  try { SB && SB.setStyle && SB.setStyle({ style: "DARK" }); } catch (e) {}

  window.jdNativeSave = function (name, text) {
    if (!FS || !Share) { alert("Сохранение недоступно"); return Promise.resolve(false); }
    return FS.writeFile({ path: name, data: text, directory: "CACHE", encoding: "utf8" })
      .then(function (r) { return Share.share({ title: name, text: "Java Drill — бэкап прогресса", url: r.uri, dialogTitle: "Сохранить бэкап" }); })
      .then(function () { return true; })
      .catch(function (e) { var m = String(e && e.message || e); if (/cancel/i.test(m)) return false; try { toast("Не удалось сохранить: " + m); } catch (_) {} return false; });
  };

  function sig() {   /* «отпечаток» видимого состояния: поменялся — значит «Назад» что-то закрыл */
    var vis = 0, sel = "#tipDrawer,#gsModal,#trefModal,#zkBox,.viz-screen,.game-play,.modal,[role=dialog]";
    document.querySelectorAll(sel).forEach(function (e) { if (!e.hidden && e.getClientRects().length) vis++; });
    var gs = document.getElementById("gameStage");
    return (typeof mode !== "undefined" ? mode : "") + "|" + vis + "|" + (gs ? gs.childElementCount + ":" + gs.innerHTML.length : "");
  }
  /* ---- нижняя панель под большой палец: вкладки сверху на большом телефоне не достать ----
     Кнопки нажимают существующие вкладки (#tabDrill и т. д.), поэтому переходы и состояние — прежние. */
  var css = document.createElement("style");
  css.textContent =
    "html.native-app .tabs{display:none!important}" +
    "html.native-app body{padding-bottom:calc(66px + env(safe-area-inset-bottom))}" +
    "html.native-app .onb{bottom:calc(78px + env(safe-area-inset-bottom))!important}" +
    "html.native-app .toast{bottom:calc(80px + env(safe-area-inset-bottom))!important}" +
    ".jd-bb{position:fixed;left:0;right:0;bottom:0;z-index:60;display:flex;background:#0c0f18;border-top:1px solid rgba(255,255,255,.08);" +
      "padding:4px calc(4px + env(safe-area-inset-right)) calc(4px + env(safe-area-inset-bottom)) calc(4px + env(safe-area-inset-left))}" +
    ".jd-bb button{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:2px;padding:7px 2px 6px;border:0;border-radius:12px;" +
      "background:transparent;color:#8d95a8;font:600 11px/1.1 var(--sans);touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:color .15s,background .15s}" +
    ".jd-bb button b{font-size:21px;line-height:1;font-weight:400}" +
    ".jd-bb button.on{color:#fff;background:rgba(110,168,254,.14)}" +
    ".jd-bb button:active{transform:scale(.94)}" +
    ".jd-sheet{position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.55);opacity:0;transition:opacity .18s;display:flex;align-items:flex-end}" +
    ".jd-sheet.on{opacity:1}" +
    ".jd-sheet .in{width:100%;background:#121622;border-radius:20px 20px 0 0;padding:10px 12px calc(14px + env(safe-area-inset-bottom));transform:translateY(100%);transition:transform .22s cubic-bezier(.2,.8,.2,1)}" +
    ".jd-sheet.on .in{transform:none}" +
    ".jd-sheet .grab{width:40px;height:4px;border-radius:2px;background:rgba(255,255,255,.2);margin:2px auto 12px}" +
    ".jd-sheet .grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}" +
    ".jd-sheet .grid button{display:flex;align-items:center;gap:10px;padding:14px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:#171c2a;" +
      "color:#e8ecf6;font:600 14px/1.2 var(--sans);text-align:left;touch-action:manipulation;-webkit-tap-highlight-color:transparent}" +
    ".jd-sheet .grid button:active{transform:scale(.97);background:#1e2536}" +
    ".jd-sheet .grid button.on{border-color:rgba(110,168,254,.6)}";
  document.head.appendChild(css);
  var MAIN = [["tabDrill","🎴","Дрил"],["tabZero","🌱","С нуля"],["tabGame","🎮","Игра"],["tabTerms","📖","Термины"]];
  var T = function (s) { try { return typeof tr === "function" ? tr(s) : s; } catch (e) { return s; } };
  function activeId() { var a = document.querySelector('.tabs [role=tab].active, .more-menu [role=tab].active'); return a ? a.id : ""; }
  function sync() { var id = activeId(), inMain = MAIN.some(function (m) { return m[0] === id; });
    document.querySelectorAll(".jd-bb button").forEach(function (b) { b.classList.toggle("on", b.dataset.t ? b.dataset.t === id : !inMain && !!id); }); }
  function go(id) { var el = document.getElementById(id); if (el) el.click(); window.scrollTo(0, 0); setTimeout(sync, 30); }
  function sheet() {
    var old = document.querySelector(".jd-sheet"); if (old) { closeSheet(); return; }
    var ids = ["tabFp"].concat([].slice.call(document.querySelectorAll("#moreMenu [role=tab]")).map(function (b) { return b.id; })).filter(function (id) { return id !== "tabZero"; });
    var s = document.createElement("div"); s.className = "jd-sheet"; s.setAttribute("role", "dialog");
    s.innerHTML = '<div class="in"><div class="grab"></div><div class="grid">' + ids.map(function (id) { var el = document.getElementById(id); return el ? '<button data-t="' + id + '"' + (id === activeId() ? ' class="on"' : "") + ">" + el.textContent.trim() + "</button>" : ""; }).join("") + "</div></div>";
    s.onclick = function (e) { var b = e.target.closest("button[data-t]"); if (b) { closeSheet(); go(b.dataset.t); } else if (e.target === s) closeSheet(); };
    document.body.appendChild(s); requestAnimationFrame(function () { requestAnimationFrame(function () { s.classList.add("on"); }); });
  }
  function closeSheet() { var s = document.querySelector(".jd-sheet"); if (!s) return; s.classList.remove("on"); setTimeout(function () { s.remove(); }, 220); }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && document.querySelector(".jd-sheet")) { closeSheet(); e.stopImmediatePropagation(); } }, true);
  function buildBar() {
    if (document.querySelector(".jd-bb") || !document.getElementById("tabDrill")) return;
    var bb = document.createElement("nav"); bb.className = "jd-bb"; bb.setAttribute("aria-label", "Разделы");
    bb.innerHTML = MAIN.map(function (m) { return '<button data-t="' + m[0] + '"><b>' + m[1] + "</b><span>" + T(m[2]) + "</span></button>"; }).join("") + '<button data-more="1"><b>⋯</b><span>' + T("Ещё") + "</span></button>";
    bb.onclick = function (e) { var b = e.target.closest("button"); if (!b) return; if (b.dataset.more) sheet(); else { closeSheet(); go(b.dataset.t); } };
    document.body.appendChild(bb); sync();
    new MutationObserver(sync).observe(document.querySelector(".tabs"), { subtree: true, attributes: true, attributeFilter: ["class"] });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", buildBar); else buildBar();
  /* язык поменялся — подписи панели тоже */
  document.addEventListener("click", function (e) { if (e.target.closest("#langTog")) setTimeout(function () { var bb = document.querySelector(".jd-bb"); if (bb) { bb.remove(); buildBar(); } }, 600); });

  /* ---- лёгкая вибрация на нажатие кнопок и вариантов ответа ---- */
  var Hap = P.Haptics, lastHap = 0;
  document.addEventListener("pointerdown", function (e) {
    if (!Hap) return; var b = e.target.closest(".btn,.bopt,.dg-opt,.opt,.wp-opt,.zk-qb,.jd-bb button,.jd-sheet button,.tabs button"); if (!b) return;
    var now = Date.now(); if (now - lastHap < 60) return; lastHap = now;
    try { Hap.impact({ style: "LIGHT" }); } catch (_) {}
  }, { passive: true });

  var lastBack = 0;
  if (App) App.addListener("backButton", function () {
    try {
      if (document.querySelector(".jd-sheet")) { closeSheet(); return; }   /* шторка «Ещё» — первой: она гаснет с анимацией */
      if (typeof ZKV !== "undefined" && ZKV && typeof zkClose === "function") { zkClose(); return; }
      var before = sig();
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
      setTimeout(function () {
        if (sig() !== before) return;
        if (typeof mode !== "undefined" && mode !== "drill" && typeof setMode === "function") { setMode("drill"); window.scrollTo(0, 0); return; }
        var now = Date.now();
        if (now - lastBack < 2000) { App.exitApp(); return; }
        lastBack = now; try { toast("Нажми «Назад» ещё раз, чтобы выйти"); } catch (e) {}
      }, 60);
    } catch (e) { App.exitApp(); }
  });
})();
