let texto = document.getElementById('texto-ingreso').value;
let arrayLLaves = ['enter', 'imes', 'ai', 'ober', 'ufat'];
let arrayVocales = ['e', 'i', 'a', 'o', 'u'];

let validadorCatacteresEspeciales = validacionCaracteresEspeciales(texto);
let validadorIngresoVacio = validacionIngresoVacio(texto);

let textoEncriptado = encriptacionTexto(texto, arrayLLaves, arrayVocales, validadorCatacteresEspeciales, validadorIngresoVacio);
let textoDesencriptado = desencriptacionTexto(texto, arrayLLaves, arrayVocales, validadorCatacteresEspeciales, validadorIngresoVacio);

var botonCopiar = document.getElementById("botonCopiarTexto");
botonCopiar.addEventListener("click", copiarPortapapeles());

function validacionCaracteresEspeciales(texto) {

    var expresionRegular = /[^a-z0-9\s]/
    var textoMensajeAdvertencia = document.getElementById("texto__mensaje-importante");
    var imagenAdvertencia = document.getElementById("img__mensaje-importante");

    if (expresionRegular.test(texto)) {
        textoMensajeAdvertencia.style.color = "red";

        return true
    }
    else {
        textoMensajeAdvertencia.style.color = "black";

        return false
    }
}

function validacionIngresoVacio(texto) {
    var botonCopiar = document.getElementById("botonCopiarTexto");

    if (texto == "") {
        texto = "Campo vacio, por favor ingresar texto";
        botonCopiar.style.display = "none";
        return true
    }
    else {
        return false
    }
}

function encriptacionTexto(texto, arrayLLaves, arrayVocales, validadorCatacteresEspeciales, validadorIngresoVacio) {

    var textoEncriptado = texto;

    for (let i = 0; i < arrayVocales.length; i++) {

        // Expresion regular para cada una de las vocales
        let expresionRegular = new RegExp(arrayVocales[i], 'g');

        if (validadorIngresoVacio) {
            textoEncriptado = "Campo vacio, por favor ingresar texto";
        }

        else if (texto.includes(arrayLLaves[i])) {
            textoEncriptado = "El texto ingresado ya esta encriptado";
        }

        else if (validadorCatacteresEspeciales) {
            textoEncriptado = "El texto ingresado tiene caracteres especiales, acentos o mayusculas, por favor revisar.";
        }

        else {
            //El metodo replace(), encuentra una coincidencia dentro de una cadena de texto y la cambia por otra palabra o letra, segun le indiquemos
            textoEncriptado = textoEncriptado.replace(expresionRegular, arrayLLaves[i]);
        }
    }
    return textoEncriptado

}

function desencriptacionTexto(texto, arrayLLaves, arrayVocales, validadorCatacteresEspeciales, validadorIngresoVacio) {

    var textoDesencriptado = texto;

    for (let i = 0; i < arrayLLaves.length; i++) {

        // Expresion regular para cada una de las vocales
        let expresionRegular = new RegExp(arrayLLaves[i], 'g');

        if (validadorIngresoVacio) {
            textoDesencriptado = "Campo vacio, por favor ingresar texto";
        }

        else if (validadorCatacteresEspeciales) {
            textoDesencriptado = "El texto ingresado tiene caracteres especiales, acentos o mayusculas, por favor revisar.";
        }

        else {
            //El metodo replace(), encuentra una coincidencia dentro de una cadena de texto y la cambia por otra palabra o letra, segun le indiquemos
            textoDesencriptado = textoDesencriptado.replace(expresionRegular, arrayVocales[i]);
        }
    }
    return textoDesencriptado;
}

function mostrarTexto(texto) {
    document.querySelector('.con-texto__salida-texto').style.display = 'block';

    var textoTrabajado = document.getElementById("textoTrabajado");

    textoTrabajado.innerHTML = texto;

    document.querySelector('.sin-texto__salida-texto').style.display = 'none'
}

function encriptarTextoBoton() {
    let texto = document.getElementById('texto-ingreso').value;
    let validadorCatacteresEspeciales = validacionCaracteresEspeciales(texto);
    let validadorIngresoVacio = validacionIngresoVacio(texto);
    let textoEncriptado = encriptacionTexto(texto, arrayLLaves, arrayVocales, validadorCatacteresEspeciales, validadorIngresoVacio);
    mostrarTexto(textoEncriptado);
}

function desencriptarTextoBoton() {
    let texto = document.getElementById('texto-ingreso').value;
    let validadorCatacteresEspeciales = validacionCaracteresEspeciales(texto);
    let validadorIngresoVacio = validacionIngresoVacio(texto);
    let textoDesencriptado = desencriptacionTexto(texto, arrayLLaves, arrayVocales, validadorCatacteresEspeciales, validadorIngresoVacio);
    mostrarTexto(textoDesencriptado);
}

function copiarPortapapeles() {
    var textoTrabajado = document.getElementById("textoTrabajado");

    const copiarPortapapeles = async str => {
        try {
            await navigator.clipboard.writeText(str);
            console.log("Texto Copiado");
        } catch (error) {
            console.log(error);
        }
    };

    return function(){
        copiarPortapapeles(textoTrabajado.textContent)
    }
    
}
