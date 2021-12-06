"use strict";
let intentos = 0;
let numMin = 0;
let numMax = 0;
let numAleatorio = 0;
let numUser = 0;
function validarIntentos(intentos) {
    if (intentos < 1 || intentos > 10 || isNaN(intentos)) {
        return false;
    }
    else {
        return true;
    }
}
function validarNumMinMax(numMin) {
    if (numMin < 1 || numMin > 1000) {
        return false;
    }
    return true;
}
function validarNums(numMin, numMax) {
    if (!validarNumMinMax(numMin)) {
        return false;
    }
    if (numMax <= numMin || numMax > 1000) {
        return false;
    }
    if (isNaN(numMin) || isNaN(numMax)) {
        return false;
    }
    return true;
}
function getNumAleat(numMin, numMax) {
    let numAleatorio = Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
    return numAleatorio;
}
// Para capturar un objeto 
const inputIntentos = document.querySelector("#numIntentos");
const popupIntentos = document.querySelector("#popupIntentos");
const inputNumMin = document.querySelector("#numMinimo");
const popupNumMin = document.querySelector("#popupNumMin");
const inputNumMax = document.querySelector("#numMaximo");
const popupNumMax = document.querySelector("#popupNumMax");
const botonIniciarJuego = document.querySelector("#jugar");
const containerUno = document.querySelector('#container');
const containerDos = document.querySelector('#container2');
const respExito = document.querySelector('#messageExit');
const inputNumUser = document.querySelector("#numUser");
const botonJugar = document.querySelector("#probar");
function handleStartGame() {
    // Así se capturan valores de input
    intentos = parseInt(inputIntentos.value);
    numMin = parseInt(inputNumMin.value);
    numMax = parseInt(inputNumMax.value);
    // llamar a las funciones de validación.
    let intentosEsValido = validarIntentos(intentos);
    let numsEsValido = validarNums(numMin, numMax);
    if (intentosEsValido == true && numsEsValido == true) {
        numAleatorio = getNumAleat(numMin, numMax);
        console.log(numAleatorio);
        containerDos === null || containerDos === void 0 ? void 0 : containerDos.setAttribute('style', 'display: block;');
        containerUno === null || containerUno === void 0 ? void 0 : containerUno.setAttribute('style', 'display: none;');
    }
}
function handlePlay() {
    if (intentos > 0) {
        numUser = parseInt(inputNumUser.value);
        if (numUser == numAleatorio) {
            respExito === null || respExito === void 0 ? void 0 : respExito.setAttribute('style', 'display: block;');
        }
        else if (numUser > numAleatorio && numUser < numMax) {
            numMax = numUser;
            intentos--;
            alert("Te quedan " + intentos);
        }
        else if (numUser < numAleatorio && numUser > numMin) {
            numMin = numUser;
            intentos--;
            alert("Te quedan " + intentos);
        }
        alert("Debes decir un número entre " + numMin + " y " + numMax);
    }
    else {
        alert("Se te acabaron los intentos");
        containerDos === null || containerDos === void 0 ? void 0 : containerDos.setAttribute('style', 'display: none;');
        containerUno === null || containerUno === void 0 ? void 0 : containerUno.setAttribute('style', 'display: block;');
    }
}
function handleErrorIntentos() {
    intentos = parseInt(inputIntentos.value);
    let intentosEsValido = validarIntentos(intentos);
    if (intentosEsValido == false) {
        popupIntentos === null || popupIntentos === void 0 ? void 0 : popupIntentos.classList.toggle('show');
    }
}
function handleOcultarErrorIntentos() {
    intentos = parseInt(inputIntentos.value);
    let intentosEsValido = validarIntentos(intentos);
    if (!isNaN(intentos) && intentosEsValido == false) {
        popupIntentos === null || popupIntentos === void 0 ? void 0 : popupIntentos.classList.toggle('show');
    }
}
function handleErrorNumMin() {
    numMin = parseInt(inputNumMin.value);
    let numMinEsValido = validarNumMinMax(numMin);
    if (!numMinEsValido) {
        popupNumMin === null || popupNumMin === void 0 ? void 0 : popupNumMin.classList.toggle('show');
    }
}
function handleErrorNumMax(evt) {
    numMin = parseInt(inputNumMin.value);
    numMax = parseInt(inputNumMax.value);
    let numsEsValido = validarNums(numMin, numMax);
    let popupEjemplo = popupNumMax;
    if (!validarNumMinMax(numMin) || isNaN(numMin) && !validarNumMinMax(numMax)) {
        popupEjemplo.innerHTML = "El número tiene que ser entre 0 y 1000";
        popupNumMax === null || popupNumMax === void 0 ? void 0 : popupNumMax.classList.add('show');
    }
    else if (validarNumMinMax(numMin) && !validarNumMinMax(numMax) && !numsEsValido || !numsEsValido) {
        popupEjemplo.innerHTML = "El número tiene que ser entre " + numMin + " y 1000";
        popupNumMax === null || popupNumMax === void 0 ? void 0 : popupNumMax.classList.add('show');
    }
    if (evt.type == "focus") { // Verificar el tipo de evento 
        popupNumMax === null || popupNumMax === void 0 ? void 0 : popupNumMax.classList.remove('show');
    }
}
// Aquí añado los handlers
botonIniciarJuego === null || botonIniciarJuego === void 0 ? void 0 : botonIniciarJuego.addEventListener("click", handleStartGame);
inputIntentos === null || inputIntentos === void 0 ? void 0 : inputIntentos.addEventListener("blur", handleErrorIntentos);
inputIntentos === null || inputIntentos === void 0 ? void 0 : inputIntentos.addEventListener("focus", handleOcultarErrorIntentos);
inputNumMin === null || inputNumMin === void 0 ? void 0 : inputNumMin.addEventListener("blur", handleErrorNumMin);
inputNumMin === null || inputNumMin === void 0 ? void 0 : inputNumMin.addEventListener("focus", handleErrorNumMin);
inputNumMax === null || inputNumMax === void 0 ? void 0 : inputNumMax.addEventListener("blur", handleErrorNumMax);
inputNumMax === null || inputNumMax === void 0 ? void 0 : inputNumMax.addEventListener("focus", handleErrorNumMax);
botonJugar === null || botonJugar === void 0 ? void 0 : botonJugar.addEventListener("click", handlePlay);
