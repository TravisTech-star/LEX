self.addEventListener("install", (event) => {
  console.log("Nyeko Search service worker installed.");
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  // Network handling placeholder
});