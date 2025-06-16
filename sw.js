let cache_static_1 = "Static-v1"

let cache_dynamic_1 = "Dynamic-v1"

let offline_url = "offline.html"

let offlinestyle = "login.css"

let homeHtml = "./Home/index.html"

let homeJS = "./Home/home.js"

let homeStyle = "./Home/style.css"

let myplanHTML = "./Myplan/myplan.html"

let myPlanJS = "./Myplan/myplan.js"

let myplayStyle = "./Myplan/style.css"

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(cache_static_1)
        .then(function(cache){
           return cache.addAll([offline_url])
        })
    )
})

self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys()
        .then(function(keyList){
        return Promise.all(keyList.map(function(key){
            if (key !== cache_static_1){
                return caches.delete(key)
            }
        }))
        })
    )
})

self.addEventListener("fetch", function(event){
    if(event.request.mode === "navigate"){
        event.respondWith(
            (async () => {
                try{
                    const networkResponse = await fetch(event.request);
                    return networkResponse
                } catch (error){
                    console.log("Fetch failed returing to offline page", error);
                    
                    const cache = await caches.open(cache_static_1);
                    const cachedResponse = await cache.match(offline_url);
                    return cachedResponse
                }
            })()
        )
    }
})