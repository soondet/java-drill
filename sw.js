/* Service worker: приложение работает офлайн после первой загрузки. */
const CACHE="jd-538e2dde45";
/* Предзагружаем только то, без чего приложение не откроется. Английский перевод и
   комнаты под паролем сюда НЕ входят: их нет ни в одном <script src>, они грузятся
   по требованию, а обработчик ниже кладёт их в кэш при первом же обращении. Раньше
   они висели здесь и добавляли 1.5 МБ к установке всем, включая тех, кто их никогда
   не открывал. Цена: пока не открыл хоть раз — офлайн они недоступны. */
const ASSETS=["./","index.html","manifest.json","icon-192.png","icon-512.png","apple-touch-icon.png","basics.js","behav.js","bugs.js","cards-extra.js","cards.js","explainers.js","hacks.js","music-ref.js","guitar.js","books.js","cards-new.js","more-term-new.js","cards-new-aux.js","more-fp-new.js","bugs-new.js","behav-new.js","behav-situ.js","principles-new.js","pics-new.js","more-new.js","notes-new.js","design.js","review.js","money.js","diag.js","wp-new.js","zero-reactive.js","cards-gap2.js","cards-craft.js","cards-fix.js","quiz-fix.js","hooks.js","more-fp.js","more-term.js","more.js","notes.js","ord.js","pics.js","principles.js","quiz.js","take.js","term-extra.js","terms.js","tier.js","tricky.js","viz-zero.js","zdrill.js","zero.js"];
self.addEventListener("install",e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:"no-cache"})))).catch(()=>{}));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET"||!r.url.startsWith(self.location.origin))return;

  /* Саму страницу берём из сети, а кэш держим запасным вариантом. Раньше здесь
     было cache-first на всё подряд, и свежий выкат появлялся только со ВТОРОГО
     захода: первый отдавал старую копию и лишь фоном клал новую. no-cache — это
     не «качать заново», а «переспросить»: не изменилось — придёт 304 без тела. */
  if(r.mode==="navigate"){
    e.respondWith(
      fetch(new Request(r.url,{cache:"no-cache",credentials:"same-origin"})).then(res=>{
        if(res&&res.ok){ const copy=res.clone(); e.waitUntil(caches.open(CACHE).then(c=>c.put(r,copy))); }
        return res;
      }).catch(()=>caches.match(r,{ignoreSearch:true}).then(hit=>hit||caches.match("index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(r,{ignoreSearch:true}).then(hit=>{
      /* Попали в кэш — отдаём и на этом всё. Раньше здесь на каждый файл уходил
         ещё и фоновый запрос «вдруг обновилось», то есть ~47 обращений к сети на
         каждое открытие страницы. Найти он ничего не мог: имя кэша — это хэш от
         html и всех ассетов (build.js), любая правка содержимого даёт новое имя,
         install качает всё заново, а activate сносит старое. Что sw.js пересобран,
         сторожит check.js. */
      if(hit)return hit;
      /* Промах — берём из сети и оставляем себе. Клон снимаем сразу, а саму запись
         держим через waitUntil: без него браузер вправе усыпить worker, как только
         ответ ушёл странице, и put не доезжает. Именно поэтому раньше в кэш не
         попадало ничего сверх предзагрузки — проверено, ни английский, ни комнаты
         не оседали. От этого зависит, что они работают офлайн после первого захода. */
      return fetch(r).then(res=>{
        if(res&&res.ok&&res.type==="basic"){ const copy=res.clone();
          e.waitUntil(caches.open(CACHE).then(c=>c.put(r,copy))); }
        return res;
      }).catch(()=>caches.match("index.html"));
    })
  );
});
