// Minimal service worker: enables installability and provides a graceful
// offline fallback. It uses a network-first strategy for navigations so users
// always get fresh content when online, and falls back to a cached shell when
// offline. It intentionally does NOT cache API responses (auth/appointments),
// which must always be live.
const CACHE = "meddical-v1"
const OFFLINE_URLS = ["/", "/offline"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(OFFLINE_URLS)).catch(() => undefined),
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))),
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  const url = new URL(request.url)
  // Never intercept API calls or cross-origin requests.
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api")) return

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => undefined)
          return response
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/offline"))),
    )
  }
})
