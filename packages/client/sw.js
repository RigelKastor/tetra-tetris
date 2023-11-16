const CACHE_NAME = 'my-site-cache-1'
const URLS = ['/']

self.addEventListener('install', e => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      await cache.addAll(URLS)
    })()
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request)
      if (r) {
        return r
      }
      const response = await fetch(e.request)
      const cache = await caches.open(CACHE_NAME)
      cache.put(e.request, response.clone())
      return response
    })()
  )
})
