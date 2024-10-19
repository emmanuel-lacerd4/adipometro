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

function atualizarFormulario() {
    const tipoCalculo = document.getElementById('tipoCalculo').value;
    if (tipoCalculo === '3dobras') {
        document.getElementById('campos3Dobras').style.display = 'block';
        document.getElementById('campos7Dobras').style.display = 'none';
    } else {
        document.getElementById('campos3Dobras').style.display = 'none';
        document.getElementById('campos7Dobras').style.display = 'block';
    }
}

function calcularPercentualGordura() {
    const idadeInput = document.getElementById('idade');
    const pesoInput = document.getElementById('peso');
    const sexoInput = document.getElementById('sexo');
    const tipoCalculo = document.getElementById('tipoCalculo').value;

    let erro = false;

    // Limpar erros anteriores
    limparErros();

    // Verificação de campos obrigatórios
    if (!idadeInput.value) {
        idadeInput.classList.add('erro');
        erro = true;
    }
    if (!pesoInput.value) {
        pesoInput.classList.add('erro');
        erro = true;
    }
    if (!sexoInput.value) {
        sexoInput.classList.add('erro');
        erro = true;
    }

    if (erro) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    let somatorioDobras = 0;

    if (tipoCalculo === '3dobras') {
        const dobraPeitoral = parseFloat(document.getElementById('dobraPeitoral').value);
        const dobraAbdomen = parseFloat(document.getElementById('dobraAbdomen').value);
        const dobraCoxa = parseFloat(document.getElementById('dobraCoxa').value);

        if (isNaN(dobraPeitoral) || isNaN(dobraAbdomen) || isNaN(dobraCoxa)) {
            alert('Por favor, preencha todas as dobras para o cálculo de 3 dobras.');
            return;
        }

        somatorioDobras = dobraPeitoral + dobraAbdomen + dobraCoxa;

    } else {
        const dobraTriceps = parseFloat(document.getElementById('dobraTriceps').value);
        const dobraPeitoral = parseFloat(document.getElementById('dobraPeitoral7').value);
        const dobraAbdomen = parseFloat(document.getElementById('dobraAbdomen7').value);
        const dobraCoxa = parseFloat(document.getElementById('dobraCoxa7').value);
        const dobraSubescapular = parseFloat(document.getElementById('dobraSubescapular').value);
        const dobraAxilarMedia = parseFloat(document.getElementById('dobraAxilarMedia').value);
        const dobraSupraIliaca = parseFloat(document.getElementById('dobraSupraIliaca').value);

        if (
            isNaN(dobraTriceps) || isNaN(dobraPeitoral) || isNaN(dobraAbdomen) || isNaN(dobraCoxa) ||
            isNaN(dobraSubescapular) || isNaN(dobraAxilarMedia) || isNaN(dobraSupraIliaca)
        ) {
            alert('Por favor, preencha todas as dobras para o cálculo de 7 dobras.');
            return;
        }

        somatorioDobras = dobraTriceps + dobraPeitoral + dobraAbdomen + dobraCoxa + dobraSubescapular + dobraAxilarMedia + dobraSupraIliaca;
    }

    // Cálculo da gordura corporal
    let densidadeCorporal;
    if (tipoCalculo === '3dobras') {
        if (sexoInput.value === 'masculino') {
            densidadeCorporal = 1.10938 - (0.0008267 * somatorioDobras) + (0.0000016 * somatorioDobras ** 2) - (0.0002574 * parseInt(idadeInput.value));
        } else {
            densidadeCorporal = 1.0994921 - (0.0009929 * somatorioDobras) + (0.0000023 * somatorioDobras ** 2) - (0.0001392 * parseInt(idadeInput.value));
        }
    } else {
        if (sexoInput.value === 'masculino') {
            densidadeCorporal = 1.112 - (0.00043499 * somatorioDobras) + (0.00000055 * somatorioDobras ** 2) - (0.00028826 * parseInt(idadeInput.value));
        } else {
            densidadeCorporal = 1.097 - (0.00046971 * somatorioDobras) + (0.00000056 * somatorioDobras ** 2) - (0.00012828 * parseInt(idadeInput.value));
        }
    }

    const percentualGordura = ((4.95 / densidadeCorporal) - 4.5) * 100;
    document.getElementById('resultado').innerHTML = `<h4>Percentual de Gordura: ${percentualGordura.toFixed(2)}%</h4>`;
}

function limparErros() {
    document.getElementById('idade').classList.remove('erro');
    document.getElementById('peso').classList.remove('erro');
    document.getElementById('sexo').classList.remove('erro');
}


function formatarMilimetros(input) {
    let valor = input.value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
    if (valor.length > 0) {
        valor = (parseFloat(valor) / 10).toFixed(1); // Formata para uma casa decimal
    }
    input.value = valor + ' mm'; // Adiciona " mm" ao final
}

function formatarQuilogramas(input) {
    let valor = input.value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
    if (valor.length > 0) {
        valor = (parseFloat(valor) / 10).toFixed(1); // Formata para uma casa decimal
    }
    input.value = valor + ' kg'; // Adiciona " kg" ao final
}

// Vincular a função de formatação aos campos relevantes
document.getElementById('peso').addEventListener('input', function() {
    formatarQuilogramas(this);
});

document.querySelectorAll('.campos-dobras input[type="text"]').forEach(input => {
    input.addEventListener('input', function() {
        formatarMilimetros(this);
    });
});

function limparFormulario() {
    document.getElementById('adipometroForm').reset();
    document.getElementById('resultado').innerHTML = ''; // Limpa o resultado também
}