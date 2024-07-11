let score = prompt("Por favor, introduce una nota (número):");

if (score !== null) {
    score = parseFloat(score);
    if (isNaN(score)) {
        alert("Por favor, introduce un número válido.");
    } else {
        let rating;
        if (score >= 0 && score < 3) {
            rating = "Muy deficiente";
        } else if (score >= 3 && score < 5) {
            rating = "Insuficiente";
        } else if (score >= 5 && score < 6) {
            rating = "Suficiente";
        } else if (score >= 6 && score < 7) {
            rating = "Bien";
        } else if (score >= 7 && score < 9) {
            rating = "Notable";
        } else if (score >= 9 && score <= 10) {
            rating = "Sobresaliente";
        } else {
            rating = "Nota fuera de rango.";
        }
        alert(rating);
    }
}
