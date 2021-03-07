function carga(){   
    var reton;

    if (window.sessionStorage.retoselected!=null){
        console.log("retoselected");
        //venimos de retos
        reto = JSON.parse(window.sessionStorage.retoselected);
        if (reto!=null){
            cargareto(reto,true);
        }
    }else if (window.sessionStorage.misretoselected!=null){
        console.log("misretoselected");
        //venimos de mis retos
        reto = JSON.parse(window.sessionStorage.misretoselected);
        if (reto!=null){
            cargamireto(reto);
        }
    }

     
    
}

function cargareto(reto, ocultarmistos){
    var idusuario = window.localStorage.clave;
    
    var timeini= reto.inicio;
    var timefin= reto.final;

    document.getElementById("nombre").innerHTML=reto.nombre;
    document.getElementById("apodocreado").innerHTML=reto.apodocreador;
    document.getElementById("fecha").innerHTML=reto.fecha;
    
    
    //https://www.youtube.com/embed/U5SGvQ-hONI?autoplay=1&mute=1&start=120&end=180&version=3&loop=1
    
    var urlReto = reto.url+"?autoplay=1&mute=1&start="+timeini+"&end="+timefin+"&version=3&loop=1&output=embed'";

    console.log(urlReto);
    var frame = document.getElementById("reto_frame");
    frame.src=urlReto;

    if (ocultarmistos){
        document.getElementById("urlretosuperado").style.display = "none";
        document.getElementById("urltituloejemploretosuperado").style.display = "none";
        document.getElementById("urlejemploretosuperado").style.display = "none";
        document.getElementById("trbtnretosuperado").style.display = "none";
        document.getElementById("fechaetosuperado").style.display = "none";
        
    }

    console.log(idusuario+"=="+reto.idusuario);
    if (idusuario==reto.idusuario){
        //dejamos la opción de poder borrar el reto
        document.getElementById("btnaceptar").style.display = "none";
    }else{
        document.getElementById("btnaceptarborrar").style.display = "none";
    }
    
    //urlretosuperado
    //urlejemploretosuperado
    //btnretosuperado
}
function cargamireto(reto){
    reto.fecha= reto.fechacreacion;
    cargareto(reto,false);
    document.getElementById("btnaceptar").style.display = "none";
    console.log(reto);
    if (reto.estado == 1){
        console.log("estado==1");
        //reto superado modificar info de boton de 
        document.getElementById("fecharetosuperado").innerHTML= reto.fecharetosuperado;
        document.getElementById("btnretosuperado").innerText ="ACTUALIZAR DATOS";
    }else{
        document.getElementById("fechaetosuperado").style.display = "none";
    }
    //document.getElementById("urlretosuperado").style.visibility= "visible";
    //document.getElementById("urlejemploretosuperado").style.visibility= "visible";
    //document.getElementById("btnretosuperado").style.visibility= "visible";

}

function salir(){
    if (window.sessionStorage.retoselected!=null){
        window.sessionStorage.removeItem("retoselected");
        window.location.href="./index.html";
    }else if (window.sessionStorage.misretoselected!=null){
        window.sessionStorage.removeItem("misretoselected");
        window.location.href="./misretos.html";
    }
   
   
}

function save(){
    var reto = JSON.parse(window.sessionStorage.retoselected);
    var idusuario = window.localStorage.clave;
    var fecha = getTodayFechaParseada(); //util.js
    var urlretosuperado= "";
    var estado=0;
    var fecharetosuperado="";
    
        
    //console.log(reto);
    
    var retousuario = retoUsuarioDTO(idusuario,reto.idreto,reto.url,reto.dificultad,reto.inicio, reto.final,
        reto.apodocreador,reto.idusuario,reto.fecha,estado,urlretosuperado,fecha,reto.nombre,fecharetosuperado); //crearretoDAO.js
    //console.log(retousuario);
    var res = saveRetoUsuarioFB(retousuario);//crearretoDAO.js
    
    console.log("reto id ="+res);
    mostrarToast("reto asignado ;)",3000);
    
    //ponemos este valor pq queremos que nos lleve a esta página y luego ya borra la variable
    //window.sessionStorage.misretoselected="X";    
    sleep(1,3000);
}

function sleep (op, miliseconds) {
    console.log("vamos a esperar "+miliseconds/1000+" segundos");
    setTimeout(function(){ 
        
        if (op==1){ //venimos de ver el reto
            window.sessionStorage.removeItem("retoselected"); 
            window.location.href="./misretos.html";
        }else if (op==2){
            //venimos de misretos y lo hemos superado
            window.localStorage.removeItem("listamisretos");
            salir();
        }else{
            salir();
        }
    },miliseconds);
}

function updateRetoSuperado(){

    var retousuario = JSON.parse(window.sessionStorage.misretoselected);

    retousuario.urlretosuperado=document.getElementById("urlvideosuperado").value;
    retousuario.estado=1; //superado
    retousuario.fecharetosuperado=getTodayFechaParseada(); 

    //console.log(retousuario);
    mostrarToast("guardando información ...", 2000);
    updateRetoUsuarioFB(retousuario);
}

function retUpdateRetoUsuario(){
    mostrarToast("felicidades reto superado :)",3000);
    sleep(2,3000); //volvemos a mis retos
}

function deleteasignacionreto(){
    var retousuario = JSON.parse(window.sessionStorage.misretoselected);
    mostrarToast("borrando reto ...",2000);
    deleteasignacionretoFB(retousuario.idusuarioretos);
}

function retDeleteasignacionretoFB(){
    sleep(2,3000);
}

function deletereto(){
    var reto = JSON.parse(window.sessionStorage.retoselected);
    
    console.log("borramos el reto "+reto.idreto);
    deleteretoFB(reto.idreto);
    mostrarToast("borrando reto ...",3000);
}

function retDeleteretoFB(){
    console.log("retDeleteretoFB -> ahora iríamos a index");
    window.sessionStorage.removeItem("listaretos");
    sleep(3,2000);
}

