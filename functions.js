let texto = document.getElementById('texto-ingreso').value;
let arrayLLaves = ['enter', 'imes', 'ai', 'ober', 'ufat'];
let arrayVocales = ['e', 'i', 'a', 'o', 'u'];

let validadorCatacteresEspeciales = validacionCaracteresEspeciales(texto);
let validadorIngresoVacio = validacionIngresoVacio(texto);

let textoEncriptado = encriptacionTexto(texto, arrayLLaves, arrayVocales, validadorCatacteresEspeciales, validadorIngresoVacio);
let textoDesencriptado = desencriptacionTexto(texto, arrayLLaves, arrayVocales, validadorCatacteresEspeciales, validadorIngresoVacio);


function validacionCaracteresEspeciales(texto) {

    var expresionRegular = /[^a-z0-9\s]/
    var textoMensajeAdvertencia = document.getElementById("texto__mensaje-importante");
    var imagenAdvertencia = document.getElementById("img__mensaje-importante");

    if (expresionRegular.test(texto)) {
        textoMensajeAdvertencia.style.color = "red";
        textoMensajeAdvertencia.style.fontSize = "1.5rem";
        imagenAdvertencia.style.width = "2rem"

        return true
    }
    else {
        return false
    }
}

function validacionIngresoVacio(texto) {
    if (texto == "") {
        texto = "Campo vacio, por favor ingresar texto"
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
            mostrarTexto(textoEncriptado);
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

    var textoTrabajado = document.querySelector(".texto-trabajado__salida-texto");

    textoTrabajado.innerHTML = texto;

    document.querySelector('.sin-texto__salida-texto').style.display = 'none'
}


