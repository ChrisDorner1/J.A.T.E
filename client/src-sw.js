const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute, Route } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Implements asset caching
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "assetCache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// const imageRoute = new Route (({ request }) => {
//   return request.destination === image
// },
// new StaleWhileRevalidate ({
//   cacheName: "images"
// }))

// const scriptsRoute = new Route (({ request}) => {
//   return request.destination === 'script'
// }, new CacheFirst ({
//   cacheName: "scripts"
// }))

// const styleRoute = new Route(({ request }) => {
//   return request.destination === "style"
// }, new CacheFirst({
//   cacheName: "styles"
// }))

// registerRoute(imageRoute)
// registerRoute(scriptsRoute)
// registerRoute(styleRoute)
