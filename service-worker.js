const CACHE_NAME = "hymns-cache-v1";
const HYMN_FILES = [
    "MY_GOD_IS_REAL.mp3",
    "A_MIGHTY_FORTRESS_IS_OUR_GOD.mp3",
    "GOD_WILL_TAKE_CARE_OF_YOU.mp3",
    "MY_SAVIOR_FIRST_OF_ALL.mp3",
    "ROCK_OF_AGES.mp3",
    "WHAT_A_FRIEND_WE_HAVE_IN_JESUS.mp3",
    "THE_SWEET_BY_AND_BY.mp3",
    "THE_LORD_IS_MY_SHEPHERD_FOREVER.mp3",
    "THE_LILY_OF_THE_VALLEY.mp3",
    "NEVER_GROW_OLD.mp3",
    "MY_SAVIOR'S_LOVE.mp3",
    "MY_HOPE_IS_BUILT_ON_NOTHING_LESS.mp3",
    "I'LL_FLY_AWAY.mp3",
    "HIGHER_GROUND.mp3",
    "HE_WILL_HOLD_ME_FAST.mp3",
    "GREAT_IS_THY_FAITHFULNESS.mp3",
    "FAIREST_LORD_JESUS.mp3",
    "WHAT_A_SAVIOR.mp3",
    "index.html", // Cache index.html for offline loading
];

// Cache files during install
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(HYMN_FILES);
        })
    );
    self.skipWaiting();
});

// Serve cached files or fallback to network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        }).catch(() => {
            // Optional: handle offline errors here
            return new Response("You're offline and this resource isn't cached.");
        })
    );
});
