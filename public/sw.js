const CACHE_NAME = "secure-vault-shell-v2";
const APP_SHELL = [
  "/app",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-icon.png",
];

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch("/app", { cache: "reload" });
  if (!response.ok) throw new Error("Unable to cache SecureVault shell");

  await cache.put("/app", response.clone());
  const html = await response.text();
  const urls = new Set(APP_SHELL.slice(1));
  for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
    const url = match[1];
    if (url.startsWith("/_next/") || url.startsWith("/icons/") || url === "/manifest.webmanifest") urls.add(url);
  }
  await Promise.all([...urls].map(async (url) => {
    try {
      const asset = await fetch(url, { cache: "reload" });
      if (asset.ok) await cache.put(url, asset);
    } catch {}
  }));
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheAppShell());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith("secure-vault-shell-") && name !== CACHE_NAME).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok && url.pathname === "/app") {
          const cache = await caches.open(CACHE_NAME);
          await cache.put("/app", response.clone());
        }
        return response;
      } catch {
        if (url.pathname === "/app") return (await caches.match("/app")) || Response.error();
        return Response.error();
      }
    })());
    return;
  }

  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/") || url.pathname === "/manifest.webmanifest") {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    })());
  }
});
