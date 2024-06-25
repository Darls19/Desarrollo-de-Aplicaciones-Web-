function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function invertirCadena() {
    const cadena = document.getElementById('cadena').value;
    const invertida = cadena.split('').reverse().join('');
    document.getElementById('resultado-invertir').innerText = 'Cadena invertida: ' + invertida;
}

function esPrimo() {
    const numero = parseInt(document.getElementById('numero').value);
    if (numero <= 1) {
        document.getElementById('resultado-primo').innerText = numero + ' no es un número primo.';
        return;
    }
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            document.getElementById('resultado-primo').innerText = numero + ' no es un número primo.';
            return;
        }
    }
    document.getElementById('resultado-primo').innerText = numero + ' es un número primo.';
}

function eliminarDuplicados() {
    const arreglo = document.getElementById('arreglo-duplicados').value.split(',');
    const unico = [...new Set(arreglo)];
    document.getElementById('resultado-duplicados').innerText = 'Arreglo sin duplicados: ' + unico.join(', ');
}

function calcularFactorial() {
    const numero = parseInt(document.getElementById('numero-factorial').value);
    let factorial = 1;
    for (let i = 1; i <= numero; i++) {
        factorial *= i;
    }
    document.getElementById('resultado-factorial').innerText = 'Factorial de ' + numero + ' es ' + factorial;
}

function contarVocales() {
    const cadena = document.getElementById('cadena-vocales').value;
    const vocales = 'aeiouAEIOU';
    let conteo = 0;
    for (let char of cadena) {
        if (vocales.includes(char)) {
            conteo++;
        }
    }
    document.getElementById('resultado-vocales').innerText = 'Número de vocales: ' + conteo;
}

function sumarNumeros() {
    const arreglo = document.getElementById('arreglo-suma').value.split(',').map(Number);
    const suma = arreglo.reduce((total, num) => total + num, 0);
    document.getElementById('resultado-suma').innerText = 'Suma de los números: ' + suma;
}

function encontrarMaximo() {
    const arreglo = document.getElementById('arreglo-maximo').value.split(',').map(Number);
    const maximo = Math.max(...arreglo);
    document.getElementById('resultado-maximo').innerText = 'Número máximo: ' + maximo;
}
