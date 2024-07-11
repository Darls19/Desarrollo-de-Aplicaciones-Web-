const letters = "TRWAGMYFPDXBNJZSQVHLCKE";

while (true) {
    let dniNumber = prompt("Por favor, introduce tu número de DNI (0 - 99999999):");
    
    if (dniNumber === null) {
        break;
    }
    
    dniNumber = parseInt(dniNumber, 10);
    
    if (isNaN(dniNumber) || dniNumber < 0 || dniNumber > 99999999) {
        alert("Número no válido. Por favor, introduce un número entre 0 y 99999999.");
    } else {
        let letterIndex = dniNumber % 23;
        let dniLetter = letters.charAt(letterIndex);
        alert(`El número de DNI ${dniNumber} corresponde a la letra ${dniLetter}.`);
    }
}
