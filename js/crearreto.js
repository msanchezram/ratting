function carga(){

    if (window.sessionStorage.verreto!=null){
        //hay que restaurar la informacion que venimos de ver reto
        var reto = JSON.parse(window.sessionStorage.verreto);
        window.sessionStorage.removeItem("verreto");
        restaurarinformacion(reto);
    }
    
}

function salir(){
    window.sessionStorage.removeItem("verreto");
    window.document.location="./index.html";
}

function restaurarinformacion(reto){
    document.getElementById("nombrereto").value=reto.nombre;
    document.getElementById("urlvideo").value=reto.url;
    document.getElementById("tiempoinicio").value=reto.inicio;
    document.getElementById("tiempofinal").value=reto.final;
    document.getElementById("dificultad").value=reto.dificultad;
}

function crearobjetoreto(){

    var nombre=document.getElementById("nombrereto").value;
    var url=document.getElementById("urlvideo").value;
    var tiempoini=document.getElementById("tiempoinicio").value;
    var tiempofin=document.getElementById("tiempofinal").value
    var dificultad=document.getElementById("dificultad").value;

    
    if (validaTexto(nombre) && validaTexto(url) && validaEsNumero(tiempoini) &&
        validaEsNumero(tiempofin) && validaEsNumero(dificultad)){
            //si es ok se guarda
         
        var apodo =    window.localStorage.apodo;
        var idusuario = window.localStorage.clave;
        //guarda la clave de usuario en firebase
        var fecha= getTodayFechaParseada();
        reto=  retoDTO(nombre, url, dificultad, tiempoini, tiempofin, apodo, idusuario, fecha );
        
        return reto;

    }else{
        mostrarToast("los datos no son correctos :(",3000);
        return null;
    }
}

function accept(){
    
    var reto = crearobjetoreto();
    if (reto!=null){
        console.log("entro a grabar"); 
        saveRetoFB(reto);
    }
}

function verprevio(){
    var reto = crearobjetoreto();
    window.sessionStorage.verreto = JSON.stringify(reto);
    window.document.location="./verprevio.html";
}