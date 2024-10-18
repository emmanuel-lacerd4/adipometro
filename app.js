/**
 * SuperAPP - Adipômetro
 * @author Emmanuel L. Nogueira
 */

// Registrar o Service Worker >>>>>>>>>>>>>>>>>>>
// Se o Service Worker estiver disponível no navegador
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
            console.log("Servicer Worker registrado.")
        })
}