// Network-first for our own files (updates arrive without bumping VERSION); CDN libs are cache-first.
// IMPORTANT: every file listed in FILES must exist in the repo root, otherwise cache.addAll() fails and the SW will not install.
const VERSION="dos-v7",CDN=["https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js","https://cdn.jsdelivr.net/npm/adhan@4.4.3/lib/bundles/adhan.umd.min.js"];
const FILES=["./","index.html","styles.css","app.js","namaz.js","duas.js","gym.js","diet.js","finance.js","manifest.json","icon.svg","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(async c=>{await c.addAll(FILES);for(const u of CDN){try{await c.add(u)}catch(_){}}}));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))));self.clients.claim()});
const put=(r,n)=>{if(n&&n.ok){const cp=n.clone();caches.open(VERSION).then(c=>c.put(r,cp))}return n};
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
if(new URL(r.url).origin===location.origin)e.respondWith(fetch(r,{cache:"no-cache"}).then(n=>put(r,n)).catch(()=>caches.match(r).then(x=>x||caches.match("index.html"))));
else e.respondWith(caches.match(r).then(x=>x||fetch(r).then(n=>put(r,n))))});
