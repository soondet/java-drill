/* Оформление: «Классика» (исходный вид), «Неон-86» (неон, закат и сетка восьмидесятых), «Закат» (тёплый вечер, стекло, мягкий свет).
 * Как устроено:
 *  — выбор живёт в localStorage.jdSkin и ставится атрибутом <html data-skin> ещё в <head> (index.html), до первой отрисовки;
 *  — стили — в конце <style> index.html (сайт) и в разделе 12 android-app/app-native.css (приложение), всё под html[data-skin];
 *    у «Классики» атрибута нет, поэтому ни одно правило оформления её не задевает;
 *  — здесь только переключатель в меню «A» (оно же настройки и в приложении), вспышка при смене и счёт цифр.
 * Логику тренажёра файл не трогает: из чужого только оборачивает applyChrome, чтобы подписи сменили язык вместе со всем. */
(function () {
  "use strict";
  var KEY = "jdSkin", H = document.documentElement;
  var SKINS = [
    { id: "classic", ru: "Классика", en: "Classic", dru: "исходный вид", den: "the original look", pal: ["#6ea8fe", "#a98bff", "#54e6c8"], meta: "#0b0f19" },
    { id: "neon", ru: "Неон-86", en: "Neon ’86", dru: "неон, закат и сетка восьмидесятых", den: "neon, sunset, ’80s grid", pal: ["#ff4fb4", "#b46bff", "#2de2e6"], meta: "#0b0418" },
    { id: "sunset", ru: "Закат", en: "Sunset", dru: "тёплый вечер, стекло, мягкий свет", den: "warm dusk, glass, soft light", pal: ["#ffc36b", "#ff8a5c", "#ee4f7e"], meta: "#0a0a10" }
  ];
  var byId = function (id) { for (var i = 0; i < SKINS.length; i++) if (SKINS[i].id === id) return SKINS[i]; return null; };
  var en = function () { return typeof LANG !== "undefined" && LANG === "en"; };
  var L = function (ru, e) { return en() ? e : ru; };
  var still = function () { return matchMedia("(prefers-reduced-motion: reduce)").matches; };

  function get() { var k = H.getAttribute("data-skin"); return byId(k) ? k : "classic"; }
  function meta(id) { var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute("content", byId(id).meta); }

  /* Смена: короткая вспышка в цвете нового оформления, на её пике — подмена атрибута. Без движения — сразу. */
  var busy = 0;
  function apply(id) {
    if (id === "classic") H.removeAttribute("data-skin"); else H.setAttribute("data-skin", id);
    try { if (id === "classic") localStorage.removeItem(KEY); else localStorage.setItem(KEY, id); } catch (e) {}
    meta(id); draw();
    try { window.dispatchEvent(new CustomEvent("jdskin", { detail: id })); } catch (e) {}
  }
  function set(id) {
    if (!byId(id)) id = "classic";
    if (id === get()) { draw(); return; }
    if (still() || !document.body) { apply(id); return; }
    var f = document.createElement("div"); f.className = "sk-flash sk-flash-" + id; f.setAttribute("aria-hidden", "true");
    document.body.appendChild(f); var my = ++busy;
    setTimeout(function () { apply(id); }, 170);
    setTimeout(function () { f.remove(); if (my === busy) busy = 0; }, 560);
  }

  /* Переключатель в «A»: три строки — миниатюра, название с палитрой, одна строка описания. Строками, а не в ряд:
     меню узкое (210 px) и в приложении стоит у правого края — шире его не сделать, а в ряду названия обрезались. */
  function draw() {
    var pop = document.getElementById("fsPop"); if (!pop) return;
    var box = document.getElementById("skBox");
    if (!box) { box = document.createElement("div"); box.id = "skBox"; box.className = "sk-box"; pop.appendChild(box);
      box.addEventListener("click", function (e) { var b = e.target.closest(".sk-opt"); if (!b) return; e.stopPropagation(); set(b.getAttribute("data-skin")); });
      box.addEventListener("keydown", function (e) {                 /* стрелки внутри группы — как у радиокнопок */
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        var i = SKINS.findIndex(function (s) { return s.id === get(); }), n = (i + (e.key === "ArrowRight" ? 1 : SKINS.length - 1)) % SKINS.length;
        e.preventDefault(); set(SKINS[n].id); setTimeout(function () { var b = box.querySelector('[data-skin="' + SKINS[n].id + '"]'); if (b) b.focus(); }, 200); });
    }
    var cur = get();
    box.innerHTML = '<div class="sk-h">' + L("Оформление", "Appearance") + '</div><div class="sk-row" role="radiogroup" aria-label="' + L("Оформление", "Appearance") + '">' +
      SKINS.map(function (k) { var on = k.id === cur;
        return '<button type="button" class="sk-opt' + (on ? " on" : "") + '" role="radio" aria-checked="' + on + '" tabindex="' + (on ? 0 : -1) + '" data-skin="' + k.id + '">' +
          '<i class="sk-th sk-th-' + k.id + '" aria-hidden="true"></i><b>' + L(k.ru, k.en) +
          '<span class="sk-pal" aria-hidden="true">' + k.pal.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("") + "</span></b>" +
          "<small>" + L(k.dru, k.den) + "</small></button>"; }).join("") + "</div>";
  }

  /* Цифры на «Сегодня», в «Прогрессе» и в ассессменте досчитываются от нуля — только в оформлении и когда движение не мешает.
     Если цифру за это время поменял сам тренажёр, счёт бросаем: его значение главнее. */
  var COUNT = ".jt-ctr b,.jt-nums b,.jl-big b,.jr-grid b,.asm-n b,.prog-kpis b";
  function countUp(root) {
    if (!H.hasAttribute("data-skin") || still() || !root) return;
    root.querySelectorAll(COUNT).forEach(function (el) {
      var txt = el.textContent, m = /^(\D*)(\d{1,5})(\D*)$/.exec(txt); if (!m || el.childElementCount) return;
      var to = +m[2]; if (to < 2) return;
      var t0 = 0, last = txt, dur = Math.min(700, 260 + to * 6);
      function step(t) { if (!t0) t0 = t; if (el.textContent !== last) return;
        var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3), v = Math.round(to * e);
        last = m[1] + v + m[3]; el.textContent = last; if (k < 1) requestAnimationFrame(step); }
      last = m[1] + "0" + m[3]; el.textContent = last; requestAnimationFrame(step);
    });
  }

  /* Сцена в полную силу — только на «витринах» (дрил, «Сегодня», «Учить», «Карточки», «Игра»). На экранах для чтения
     текст лежит прямо на фоне, и солнце под строкой мешает читать — там сцену приглушает CSS по атрибуту data-sk-read. */
  var HUB = ["drill", "today", "learn", "cards", "game"];
  function mark(m) { if (HUB.indexOf(m) >= 0) H.removeAttribute("data-sk-read"); else H.setAttribute("data-sk-read", ""); }

  function boot() {
    draw();
    if (typeof mode !== "undefined") mark(mode);
    meta(get());
    /* язык: подписи переключателя рисуются заново вместе с остальной «рамкой» */
    if (typeof window.applyChrome === "function" && !window.applyChrome.__sk) {
      var ac = window.applyChrome; window.applyChrome = function () { var r = ac.apply(this, arguments); draw(); return r; }; window.applyChrome.__sk = true;
    }
    /* смена экрана: досчитать цифры на новом (после того как его отрисовал тренажёр и слой приложения) */
    if (typeof window.setMode === "function" && !window.setMode.__sk) {
      var sm = window.setMode; window.setMode = function (m) { var r = sm.apply(this, arguments); mark(typeof mode !== "undefined" ? mode : m);
        setTimeout(function () { countUp(document.querySelector(".view:not([hidden])")); }, 0); return r; }; window.setMode.__sk = true;
    }
    setTimeout(function () { countUp(document.querySelector(".view:not([hidden])")); }, 60);
  }
  /* слой приложения (app-native-late.js) подключается после этого файла и тоже оборачивает setMode — ждём полной загрузки */
  if (document.readyState === "complete") boot(); else window.addEventListener("load", boot);

  window.jdSkin = { get: get, set: set, list: function () { return SKINS.map(function (s) { return s.id; }); } };
})();
