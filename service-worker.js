const cacheName = 'cache-v1'
const ROOT_URL = '/tldraw/'
const precacheResources = ['', 'icon.png', 'index.html', 'main.js', 'manifest.json'].map(elem => ROOT_URL + elem)

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)))
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if(cachedResponse) {
        return cachedResponse
      }
      return fetch(event.request)
    })
  )
})
