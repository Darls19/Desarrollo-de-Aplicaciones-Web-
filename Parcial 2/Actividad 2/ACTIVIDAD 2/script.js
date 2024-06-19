document.getElementById('generar').addEventListener('click', function() {
    const nombres1 = ['Lisa', 'Jennie', 'Rosé', 'Jisoo', 'Camila', 'Lucía', 'Renata', 'Paola'];
    const nombres2 = ['Solis', 'López', 'Ortiz', 'Pérez', 'Olivarez', 'Gamboa', 'Sanchez', 'Vargas'];

    const nombreAleatorio1 = nombres1[Math.floor(Math.random() * nombres1.length)];
    const nombreAleatorio2 = nombres2[Math.floor(Math.random() * nombres2.length)];

    document.getElementById('nombre').textContent = `El nombre generado es: ${nombreAleatorio1} ${nombreAleatorio2}`;
});
