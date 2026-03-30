// Drift Journal Service Worker v2
const CACHE = 'drift-v62';  // bump version to force cache refresh
const ASSETS = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting(); // activate immediately
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => {
        console.log('Deleting old cache:', k);
        return caches.delete(k);
      }))
    )
  );
  self.clients.claim(); // take control immediately
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Never cache API calls
  if (url.hostname.includes('usgs.gov') || 
      url.hostname.includes('anthropic.com') ||
      url.hostname.includes('open-meteo.com') ||
      url.hostname.includes('nominatim.openstreetmap.org')) {
    return;
  }
  // Network first for HTML (always get fresh app)
  if (e.request.destination === 'document' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request)
        .then(r => { caches.open(CACHE).then(c => c.put(e.request, r.clone())); return r; })
        .catch(() => caches.match(e.request))
    );
    return;
  }
  // Cache first for everything else
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(r => {
        if (r.status === 200) caches.open(CACHE).then(c => c.put(e.request, r.clone()));
        return r;
      });
    })
  );
});
