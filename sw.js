const CACHE_NAME="cache-v1"
const CACHEDINAMIC_NAME="dinamic-v1"  
const CACHE_INMUTABLE_NAME="INMUTABLENAME-v1"        
self.addEventListener('install',event=>{
 const instalandocache = caches.open(CACHE_NAME).then
 (cache=>{
   //cache.addAll([ "/","index.html","css/style.css","img/favico.ico","js/app.js","img/avs/blackbull.jpg","img/avs/cat.png","img/avs/kangoroo.png"])
   cache.addAll([ "index.html","css/style.css","img/favico.ico","js/app.js","img/avs/blackbull.jpg","img/avs/cat.png","img/avs/kangoroo.png","pages/offline.html"])

 });


 event.waitUntil(promise.all({instalandocache,instalandoInmutable}));



  });
/*
  self.addEventListener("fetch",evento=>{
  //Estrategia cache only 

  evento.respondWith(caches.match(evento.request))
  })*/
//cache con network fallback
function limpiaCache(cacheName, itemsNumber){
caches.open(cacheName)
.then(cache => {
    //obtrer loe elementos
    return cache.keys()
        .then(keys => {
            console.log(keys);
            if(keys.length > itemsNumber){
                cache.delete(keys[0])
                    .then(limpiaCache(cacheName,itemsNumber));
            }
        });
});
}

self.addEventListener("fetch",evento=>{

//Estrategia cache only 
const respuestaFallback = caches.match(evento.request).then
(res=>{
if(res) return res;
console.log("este elemento no existe",evento.request.url)
return fetch(evento.request).then(newrespond=>{
caches.open(CACHEDINAMIC_NAME).then(cache=>{

cache.put(evento.request,newrespond);
limpiaCache(CACHEDINAMIC_NAME, 100)
});

const instalandoInmutable = caches.open(CACHE_INMUTABLE_NAME).then
(cache=>{
cache.add(["pages/offline.html","https://fonts.googleapis.com/css?family=Lato:400,300","https://fonts.googleapis.com/css?family=Quicksand:300,400","https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css","js/libs/jquery.js"])

});

}).catch(error=>{
if (evento.request.headers.get('accept').includes('text/html')) {
return caches.match('pages/offline.html');
};
})
//return newrespond.clone();
});
evento.respondWith(respuestaFallback)
});
