/**
 * Service Worker
 * @author Emmanuel L. Nogueira
 * @link https://github.com/emmanuel-lacerd4/
 */

// Instalar do Service Worker
self.addEventListener('install', (event) => {
    console.log("Instalando o Service Worker...", event)
    // Pré carregamento em cache
    event.waitUntil(
        // Armazenar em cache
        caches.open('static')
            .then((cache) => {
                console.log("Pré carregamento de arquivos do APP")
                cache.add('/adipometro/')
                cache.add('/adipometro/index.html')
                cache.add('/adipometro/style.css')
                cache.add('/adipometro/app.js')
            })
    )
})

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log("Ativando o Service Worker...", event)
    return self.clients.claim() // Garantir o serviço em todos os documentos do aplicativo.
})

// Escutando requisições "buscando algo"
self.addEventListener('fetch', (event) => {
    //console.log("Buscando algo...", event)
    // Armazenar em cache(arquivos estáticos pré carregados) todas as requisições
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                }
            })
    )
})