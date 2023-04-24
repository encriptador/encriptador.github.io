
const $textArea = document.querySelector("#textArea");
const $buttonEncriptar = document.querySelector("#encriptar");
const $buttonDesencriptar = document.querySelector("#desencriptar");
const $font24px = document.querySelector("#font24px");
const $font16px = document.querySelector("#font16px");
const $muestraValueFinal = document.querySelector("#textoSalida");
const $buttonCopiar = document.querySelector("#copiar");
const $divmuestraValueFinal = document.querySelector("#muestraValueEncriptado");
const $SectionOutput = document.querySelector("#sectionOutput")
const $divNoHayTexto = document.querySelector("#divNoHayTexto");

let mensajeCopiado; 

    function validaValue(value){
        let expReg = /^[ a-zñ]+$/;
        if(expReg.test(value)=== true){ return value; }
        if(value===""){ throw new Error("vacio"); }
        else{ throw new Error("invalido");}
    }

    function encripta(valueValidado){
        let codex = {
            a: "ai",
            e: "enter",
            i: "imes",
            o: "ober",
            u: "ufat",
        };
        let valueEncriptado = valueValidado.replace(/a|e|i|o|u/gi, (letra) => {
            return codex[letra];
        });
        return valueEncriptado;
    }

    function desencripta(valueValidado){
        if(valueValidado===undefined){
            return;
        }
        let codex = {
            ai: "a",
            enter: "e",
            imes: "i",
            ober: "o",
            ufat: "u",
        };
        let valueDesencriptado = valueValidado.replace(/ai|enter|imes|ober|ufat/gi, (letra) => {
          return codex[letra];
        });
        return valueDesencriptado;
    }

    const errorPersonalizado = (error) =>{
        if(error.message==="vacio"){
            $divmuestraValueFinal.classList.remove("secctionOutput__valueEncriptado--active");
            $divNoHayTexto.classList.add("secctionOutput__divNoHayTexto--active");
            $font24px.textContent = "Ningun mensage fue encontrado";
            $font16px.textContent = "Ingresa el texto que deseas encriptar o desencriptar.";
            window.scrollTo(0, document.body.scrollHeight);
        }
        if(error.message==="invalido"){
            $divmuestraValueFinal.classList.remove("secctionOutput__valueEncriptado--active");
            $font24px.textContent = "¡Ups! Algo salió mal";
            $font16px.textContent = "No se aceptan mayusculas ni caracteres especiales (%$#!+*?,.) intentalo de nuevo.";
            $divNoHayTexto.classList.add("secctionOutput__divNoHayTexto--active");
            window.scrollTo(0, document.body.scrollHeight);
        }
    }





    document.addEventListener("click", (e)=>{
        if(e.target === $buttonEncriptar){
            try {
                let textAreaValue = $textArea.value;
                let valueEncriptado = encripta(validaValue(textAreaValue));
                mensajeCopiado = valueEncriptado;

                $muestraValueFinal.textContent = valueEncriptado.substring(0,500);
                $divmuestraValueFinal.classList.add("secctionOutput__valueEncriptado--active");
                $divNoHayTexto.classList.remove("secctionOutput__divNoHayTexto--active");
                $buttonCopiar.textContent = "Copiar";
                $textArea.value = "";
                window.scrollTo(0, document.body.scrollHeight);
            } catch (error) {
                errorPersonalizado(error);
            }
        }

        if(e.target === $buttonDesencriptar){
            try {
                let textAreaValue = $textArea.value;
                let valueDesencriptado = desencripta(validaValue(textAreaValue));
                mensajeCopiado = valueDesencriptado;
                

                $muestraValueFinal.textContent = valueDesencriptado.substring(0,500);
                $divmuestraValueFinal.classList.add("secctionOutput__valueEncriptado--active");
                $divNoHayTexto.classList.remove("secctionOutput__divNoHayTexto--active");
                $buttonCopiar.textContent = "Copiar";
                $textArea.value = "";
                window.scrollTo(0, document.body.scrollHeight);
            } catch (error) {
                errorPersonalizado(error);
            }

        }

        if(e.target === $buttonCopiar){ 
            navigator.clipboard.writeText(mensajeCopiado);
            $buttonCopiar.textContent = "Mensaje copiado!!"
        }
    });


