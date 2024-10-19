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

function calcularPercentualGordura() {
    const idade = parseInt(document.getElementById('idade').value);
    const sexo = document.getElementById('sexo').value;
    const dobraTriceps = parseFloat(document.getElementById('dobraTriceps').value);
    const dobraPeitoral = parseFloat(document.getElementById('dobraPeitoral').value);
    const dobraAbdomen = parseFloat(document.getElementById('dobraAbdomen').value);
    const dobraCoxa = parseFloat(document.getElementById('dobraCoxa').value);

    // Verificar se todos os campos foram preenchidos corretamente
    if (isNaN(idade) || !sexo || isNaN(dobraTriceps) || isNaN(dobraPeitoral) || isNaN(dobraAbdomen) || isNaN(dobraCoxa)) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    console.log(`Idade: ${idade}, Sexo: ${sexo}, Tríceps: ${dobraTriceps}, Peitoral: ${dobraPeitoral}, Abdômen: ${dobraAbdomen}, Coxa: ${dobraCoxa}`);

    // Cálculo do somatório das dobras cutâneas
    const somatorioDobras = dobraTriceps + dobraPeitoral + dobraAbdomen + dobraCoxa;

    // Fórmula para cálculo do percentual de gordura, considerando as quatro dobras
    let percentualGordura;
    if (sexo === 'masculino') {
        percentualGordura = (0.29288 * somatorioDobras) - (0.0005 * somatorioDobras ** 2) + (0.15845 * idade) - 5.76377;
    } else {
        percentualGordura = (0.29669 * somatorioDobras) - (0.00043 * somatorioDobras ** 2) + (0.1331 * idade) - 3.847;
    }

    console.log(`Percentual de Gordura Calculado: ${percentualGordura}`);

    // Mostrar o resultado na página
    document.getElementById('resultado').innerHTML = `<h4>Percentual de Gordura: ${percentualGordura.toFixed(2)}%</h4>`;
}
