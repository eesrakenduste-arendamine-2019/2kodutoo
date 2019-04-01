var CACHE_NAME = 'my-site-cache-v2';
var urlsToCache = [
  'https://caupo.ee/raamat/',
  'https://caupo.ee/raamat/index.html',
  'https://caupo.ee/raamat/192px.png',
  'https://caupo.ee/raamat/512px.png',
  'https://caupo.ee/raamat/favicon.png',
  'https://caupo.ee/raamat/main.js',
  'https://caupo.ee/raamat/style.css',
  'https://caupo.ee/raamat/manifest.json'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
		console.log(urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
