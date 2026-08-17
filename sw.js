/* Service worker: приложение работает офлайн после первой загрузки. */
const CACHE="jd-a275b4a2c5";
const ASSETS=["./","index.html","manifest.json","icon-192.png","icon-512.png","apple-touch-icon.png","basics.js","behav.js","bugs.js","cards-extra.js","cards.js","explainers.js","hb-data.js","sing-data.js","qa-data.js","hacks.js","music-ref.js","hooks.js","i18n-en.js","more-fp.js","more-term.js","more.js","notes.js","ord.js","pics.js","principles.js","quiz.js","take.js","term-extra.js","terms.js","tier.js","tricky.js","viz-zero.js","zdrill.js","zero.js"];
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
  e.respondWith(
    caches.match(r,{ignoreSearch:true}).then(hit=>{
      if(hit){ fetch(r).then(res=>{ if(res&&res.ok)caches.open(CACHE).then(c=>c.put(r,res.clone())); }).catch(()=>{}); return hit; }
      return fetch(r).then(res=>{
        if(res&&res.ok&&res.type==="basic")caches.open(CACHE).then(c=>c.put(r,res.clone()));
        return res;
      }).catch(()=>caches.match("index.html"));
    })
  );
});
