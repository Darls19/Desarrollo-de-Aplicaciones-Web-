let age = prompt("Por favor, introduce tu edad:");

if (age !== null) {
    age = parseInt(age, 10);
    if (isNaN(age)) {
        alert("Por favor, introduce un número válido.");
    } else if (age >= 18) {
        alert("Ya puedes conducir.");
    } else {
        alert("Aún no puedes conducir.");
    }
}
