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
  var lastBack = 0;
  if (App) App.addListener("backButton", function () {
    try {
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
