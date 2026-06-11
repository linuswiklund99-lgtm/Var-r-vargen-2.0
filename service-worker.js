importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyClYJkGbaz_H0qDSoaeUXBYiSfJ7JY-0Zk",
  authDomain: "var-ar-vargen-d69ab.firebaseapp.com",
  projectId: "var-ar-vargen-d69ab",
  storageBucket: "var-ar-vargen-d69ab.firebasestorage.app",
  messagingSenderId: "302114756240",
  appId: "1:302114756240:web:5b174a9efd1a87cecf6a15"
});

const messaging = firebase.messaging();
const CACHE_NAME = 'var-ar-vargen-v44';
const APP_SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(res => res || caches.match('./index.html'))));
});

// FCM visar automatiskt bakgrundsnotiser när payloaden innehåller notification/webpush.notification.
// Vi visar inte en extra showNotification här, annars blir det dubbla notiser på telefonen.
messaging.onBackgroundMessage(() => {});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || './';
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(clientList => {
    for (const client of clientList) {
      if ('focus' in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});
