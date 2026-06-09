const CACHE_NAME = 'var-ar-vargen-v41';
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
// Minimal service worker for PWA install support. Network remains source of truth.
self.addEventListener('fetch', event => {});
