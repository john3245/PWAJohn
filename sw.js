

importScripts('js/sw-acces.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';
const APP_SHELL = [
  "./","index.html","css/style.css","img/favico.ico","js/app.js","img/avs/blackbull.jpg","img/avs/cat.png","img/avs/kangoroo.png","pages/offline.html","js/sw-acces.js"
];
const APP_SHELL_INMUTABLE = [
  "pages/offline.html","https://fonts.googleapis.com/css?family=Lato:400,300","https://fonts.googleapis.com/css?family=Quicksand:300,400","https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css","js/libs/jquery.js"
];


self.addEventListener('install', event => {
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(APP_SHELL);
    });
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => {
        cache.addAll(APP_SHELL_INMUTABLE);
    });
    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});


self.addEventListener('activate', event => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });
    event.waitUntil(respuesta);
});


self.addEventListener('fetch', event => {
    const respuesta = caches.match(event.request).then(res => {
        if (res) { return res; } else {
            return fetch(event.request).then(newRes => {
                return actualizaCacheDinamico(DYNAMIC_CACHE, event.request, newRes);
            });
        }
    });

    event.respondWith(respuesta);
});