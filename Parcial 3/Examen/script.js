// Ej 1
function filtrarMayoresDeEdad(personas) {
    return personas.filter(persona => persona.edad >= 18);
}
const personas = [
    { nombre: 'Andrea', edad: 17 },
    { nombre: 'Paola', edad: 22 },
    { nombre: 'Naaybi', edad: 15 },
    { nombre: 'Monseratt', edad: 19 }
];
document.getElementById('ejercicio1').innerText = 'Personas mayores de edad: ' + JSON.stringify(filtrarMayoresDeEdad(personas));

// Ej 2
function transformarYFiltrar(numeros) {
    const cuadrados = numeros.map(num => num * num);
    const filtrados = cuadrados.filter(cuadrado => cuadrado > 20);
    return { cuadrados, filtrados };
}
const numeros = [2, 3, 4, 5, 6];
const resultado = transformarYFiltrar(numeros);
document.getElementById('ejercicio2').innerHTML = `
    <p>Números originales: ${numeros.join(', ')}</p>
    <p>Cuadrados de los números: ${resultado.cuadrados.join(', ')}</p>
    <p>Cuadrados mayores de 20: ${resultado.filtrados.join(', ')}</p>
`;

// Ej 3
async function obtenerUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        const data = await response.json();
        mostrarUsuarios(data);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        document.getElementById('ejercicio3').innerText = 'Error al obtener usuarios.';
    }
}

function mostrarUsuarios(usuarios) {
    const usuariosContainer = document.getElementById('ejercicio3');
    usuariosContainer.innerHTML = ''; 
    const ul = document.createElement('ul');
    ul.className = 'list-group';
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = `${usuario.name} - ${usuario.email}`;
        ul.appendChild(li);
    });
    usuariosContainer.appendChild(ul);
}

document.getElementById('obtenerUsuarios').addEventListener('click', obtenerUsuarios);

// Ej 4
document.getElementById('agregarItem').addEventListener('click', () => {
    const lista = document.getElementById('lista');
    const nuevoItem = document.createElement('li');
    nuevoItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    nuevoItem.innerText = 'Nuevo ítem';
    const botonEliminar = document.createElement('button');
    botonEliminar.className = 'btn btn-danger btn-sm';
    botonEliminar.innerText = 'Eliminar';
    botonEliminar.addEventListener('click', () => {
        lista.removeChild(nuevoItem);
    });
    nuevoItem.appendChild(botonEliminar);
    lista.appendChild(nuevoItem);
});

// Ej 5
function ordenarPorPropiedad(arr, propiedad) {
    return arr.slice().sort((a, b) => a[propiedad] > b[propiedad] ? 1 : -1);
}
const objetos = [
    { nombre: 'Lisa', edad: 30 },
    { nombre: 'Jennie', edad: 25 },
    { nombre: 'Rosé', edad: 28 },
    { nombre: 'Jisoo', edad: 29 }
];
document.getElementById('ejercicio5').innerText = 'Objetos ordenados por edad: ' + JSON.stringify(ordenarPorPropiedad(objetos, 'edad'));
