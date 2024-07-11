let concatenatedString = "";
let userInput;

while (true) {
    userInput = prompt("Introduce una cadena de texto (pulsa 'Cancelar' para terminar):");
    if (userInput === null) {
        break;
    }
    if (concatenatedString === "") {
        concatenatedString = userInput;
    } else {
        concatenatedString += "-" + userInput;
    }
}

alert(concatenatedString);
