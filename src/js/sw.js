const CACHE_NAME = 'ban-cao-v1'
const CORE_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/main.js'
]
self.addEventListener('install', (event)=>{
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS))
  )
  self.skipWaiting()
})
self.addEventListener('activate', (event)=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null)))
  )
  self.clients.claim()
})
self.addEventListener('fetch', (event)=>{
  const req = event.request
  const url = new URL(req.url)
  if(req.method !== 'GET') return
  if(url.pathname.includes('/assets/') || req.destination==='image'){
    event.respondWith(
      caches.match(req).then(cached=>{
        const fetchPromise = fetch(req).then(res=>{
          const copy = res.clone()
          caches.open(CACHE_NAME).then(cache=>cache.put(req, copy))
          return res
        }).catch(()=>cached)
        return cached || fetchPromise
      })
    )
    return
  }
  event.respondWith(
    caches.match(req).then(cached=>{
      return cached || fetch(req).then(res=>{
        const copy = res.clone()
        caches.open(CACHE_NAME).then(cache=>cache.put(req, copy))
        return res
      }).catch(()=>cached)
    })
  )
})
