let intentos:number = 0;
let numMin:number = 0;
let numMax:number = 0;
let numAleatorio:number = 0;
let numUser:number = 0;


function validarIntentos(intentos:number):boolean {
    if (intentos < 1 || intentos >10 || isNaN(intentos)) {
        return false;
    } else {
        return true;
    }
}

function validarNumMinMax(numMin:number):boolean {
    if (numMin < 1 || numMin > 1000) {
        return false;
    }
    return true;
}

function validarNums(numMin:number, numMax:number):boolean {
    if(!validarNumMinMax(numMin)) {
        return false;
    }
    if (numMax <= numMin || numMax > 1000) {       
        return false;
    }
    if (isNaN(numMin)  || isNaN(numMax)) {
        return false;
    }
    return true;  
     
}

function getNumAleat(numMin:number, numMax:number):number {
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
    intentos = parseInt((<HTMLInputElement>inputIntentos).value);
    numMin = parseInt((<HTMLInputElement>inputNumMin).value);
    numMax = parseInt((<HTMLInputElement>inputNumMax).value);
    
    // llamar a las funciones de validación.
    let intentosEsValido:boolean = validarIntentos(intentos);
    let numsEsValido:boolean = validarNums(numMin, numMax);
    
    if (intentosEsValido == true && numsEsValido == true) {
        numAleatorio = getNumAleat(numMin, numMax);
        console.log(numAleatorio)       
        containerDos?.setAttribute('style', 'display: block;');
        containerUno?.setAttribute('style', 'display: none;');
    }      
}

function handlePlay() {
    if (intentos > 0) {
            numUser = parseInt((<HTMLInputElement>inputNumUser).value);
        if (numUser == numAleatorio) {            
            respExito?.setAttribute('style', 'display: block;');

        } else if ( numUser > numAleatorio && numUser < numMax ){
            numMax = numUser;
            intentos--;
            alert("Te quedan " + intentos);
        } else if ( numUser < numAleatorio && numUser > numMin ){
            numMin = numUser;
            intentos--;
            alert("Te quedan " + intentos);
        }
        alert("Debes decir un número entre " + numMin + " y " + numMax);
    } else{
        alert("Se te acabaron los intentos")
        containerDos?.setAttribute('style', 'display: none;');
        containerUno?.setAttribute('style', 'display: block;');
    }   
}

function handleErrorIntentos() {
    intentos = parseInt((<HTMLInputElement>inputIntentos).value);
    let intentosEsValido:boolean = validarIntentos(intentos);
    if (intentosEsValido == false) {
        popupIntentos?.classList.toggle('show');
    }
}

function handleOcultarErrorIntentos() {
    intentos = parseInt((<HTMLInputElement>inputIntentos).value);
    let intentosEsValido:boolean = validarIntentos(intentos);
    if(!isNaN(intentos) && intentosEsValido == false){
        popupIntentos?.classList.toggle('show');
    }   
}

function handleErrorNumMin() {
    numMin = parseInt((<HTMLInputElement>inputNumMin).value);
    let numMinEsValido:boolean = validarNumMinMax(numMin);
    if (!numMinEsValido) {
        popupNumMin?.classList.toggle('show');
    }
}

function handleErrorNumMax(evt) {
    numMin = parseInt((<HTMLInputElement>inputNumMin).value);
    numMax = parseInt((<HTMLInputElement>inputNumMax).value);
    let numsEsValido:boolean = validarNums(numMin, numMax);
    
        let popupEjemplo = <HTMLElement> popupNumMax;
        if (!validarNumMinMax(numMin) || isNaN(numMin) && !validarNumMinMax(numMax)) {
            popupEjemplo.innerHTML = "El número tiene que ser entre 0 y 1000";
            popupNumMax?.classList.add('show');
        } else if(validarNumMinMax(numMin) && !validarNumMinMax(numMax) && !numsEsValido || !numsEsValido){
            popupEjemplo.innerHTML = "El número tiene que ser entre "+ numMin +" y 1000";
            popupNumMax?.classList.add('show');
        }

        if (evt.type == "focus") { // Verificar el tipo de evento 
            popupNumMax?.classList.remove('show');
        }
   
}


// Aquí añado los handlers
botonIniciarJuego?.addEventListener("click", handleStartGame);
inputIntentos?.addEventListener("blur", handleErrorIntentos);
inputIntentos?.addEventListener("focus", handleOcultarErrorIntentos);
inputNumMin?.addEventListener("blur", handleErrorNumMin);
inputNumMin?.addEventListener("focus", handleErrorNumMin);
inputNumMax?.addEventListener("blur", handleErrorNumMax);
inputNumMax?.addEventListener("focus", handleErrorNumMax);
botonJugar?.addEventListener("click", handlePlay);








