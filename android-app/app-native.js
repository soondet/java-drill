/* Нативный слой Android-приложения (Capacitor), ранняя часть. Подключается только в сборке APK, на сайте его нет.
 * 1) сохранение бэкапа: WebView не скачивает по ссылке — пишем файл и открываем «Поделиться»;
 * 2) светлые значки строки состояния на тёмном фоне;
 * 3) вибрация на нажатия; оценки карточек — своя, по смыслу (в app-native-late.js);
 * 4) кнопка «Назад»: меню и окна (как Esc) → из занятия и разделов — на «Сегодня» → второй «Назад» = выход.
 * Экраны «Сегодня», «Учить», «Карточки», нижняя панель и занятие — в app-native-late.js: ему нужны функции дрила. */
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

  /* ---- вибрация на нажатие кнопок и вариантов ответа; оценки карточек вибрируют сами ---- */
  var Hap = P.Haptics, lastHap = 0;
  window.jdHaptic = function (kind) {
    if (!Hap) return;
    try { if (kind === "good") Hap.notification({ type: "SUCCESS" }); else if (kind === "bad") Hap.impact({ style: "MEDIUM" }); else Hap.impact({ style: "LIGHT" }); } catch (_) {}
  };
  document.addEventListener("pointerdown", function (e) {
    if (!Hap) return; var b = e.target.closest(".btn,.bopt,.dg-opt,.opt,.wp-opt,.zk-qb,.jd-bb button,.jd-tile,.jd-row,.tabs button"); if (!b || b.closest("#act")) return;
    var now = Date.now(); if (now - lastHap < 60) return; lastHap = now;
    try { Hap.impact({ style: "LIGHT" }); } catch (_) {}
  }, { passive: true });

  var lastBack = 0;
  if (App) App.addListener("backButton", function () {
    try {
      if (window.jdNative && window.jdNative.back()) return;          /* меню карточки, отмена — у позднего слоя */
      if (typeof ZKV !== "undefined" && ZKV && typeof zkClose === "function") { zkClose(); return; }
      var before = sig();
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
      setTimeout(function () {
        if (sig() !== before) return;
        var homeHere = typeof mode !== "undefined" && (mode === "today" || (mode === "bro" && typeof broPinned === "function" && broPinned()));
        if (typeof mode !== "undefined" && !homeHere && typeof setMode === "function") { setMode(window.jdNative ? window.jdNative.home() : "drill"); window.scrollTo(0, 0); return; }
        var now = Date.now();
        if (now - lastBack < 2000) { App.exitApp(); return; }
        lastBack = now; try { toast("Нажми «Назад» ещё раз, чтобы выйти"); } catch (e) {}
      }, 60);
    } catch (e) { App.exitApp(); }
  });
})();
