/*const CACHE_NAME="cache-1";
const CACHE_DINAMIC="dinamic-1"; 
const CACHE_INMUTABLE="INMUTABLe-1";

//Cargar lo mas importante:
const APP_SHELL = [ "/","index.html","css/style.css","img/favico.ico","js/app.js","img/avs/blackbull.jpg","img/avs/cat.png","img/avs/kangoroo.png"];

const APP_INMUTABLE = ["https://fonts.googleapis.com/css?family=Lato:400,300","https://fonts.googleapis.com/css?family=Quicksand:300,400","https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css","js/libs/jquery.js"];
//Crear caches Install
self.addEventListener('install',event=>{
 
    const cache_app=caches.open(CACHE_NAME).then(cache=>{
cache.addAll(APP_SHELL);
    });
const cache_inmutable =caches.open(CACHE_INMUTABLE).then(cache=>{
    cache.addAll(APP_INMUTABLE);
        });
//Esperar a que se cree esas promesas
        event.waitUntil(promise.all([cache_app,cache_inmutable]));
     });

     //Crear Activate
     self.addEventListener('activate', event => {
     
    });*/
    	
//Archivo js/app.js
//Instalar el Service Worker, para usarlo cuando estemos en local
//y cuando estemos en producción (GitHub Pages), para esto validaremos si se
//esta corriendo la PWA en desarrollo o en producción
 
//determinar en donde se esta corriendo la aplicación
var url = window.location.href; //obtenemos todo el url
var pwaLocation = '/PWAJohn/sw.js'; //path donde se encuentra el sw en GitHub
 
if(navigator.serviceWorker){
    console.log("Tienes serviceworker");
    if(url.includes('localhost')||url.includes('192.168.1.64')||url.includes('127.0.0.1') ){
        pwaLocation = '/sw.js';
    }
navigator.serviceWorker.register(pwaLocation);
}

self.addEventListener('install',event=>{
    console.log("Instalando service worker 2.3")
     registration.update();
    const descargasPendientes = new Promise((resolve, reject)=>{
      setTimeout(() => {
        console.log("Instalaciones descargadas.....");
        self.skipWaiting();
        resolve();
      }, 2000);
      
    })
  
    event.waitUntil(descargasPendientes);
  
  
  
    });
  
    self.addEventListener('activate',event=>{
      console.log("Activate service worker 2.3")
      });
      
    
    self.addEventListener('fetch',event=>{
        console.log("ServiceWorker:"+ event.request.url)
        });
  
  
        self.addEventListener('sync',event=>{
         console.log("se tiene conexión")
         console.log(event);
         console.log(event.tag)
  
          });
  
          