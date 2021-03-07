function carga(){
   
    var mail =window.localStorage.getItem("mail");
    var fechanac=window.localStorage.getItem("fnac");
    //alert(fechanac);
    if (mail!=null && mail.length>0){
        document.getElementById("fmail").value=mail;
        document.getElementById("fnac").value=fechanac;
    }
    document.getElementById("tr-cu").style.visibility = "hidden";
    
    document.getElementById("is").className='buttonlogin_selected';
    //.style="background-color: #0070B8;color: #003153";
    window.sessionStorage.optionlogin="is";
    
    /*
        document.getElementById("MyElement").classList.add('MyClass');
        document.getElementById("MyElement").classList.remove('MyClass');
        if ( document.getElementById("MyElement").classList.contains('MyClass') )
        document.getElementById("MyElement").classList.toggle('MyClass');

    */
    
}

function salir(){
    window.sessionStorage.removeItem("optionlogin");
    window.document.location="./configuracion.html";
}
function selAction(id){


    
    document.getElementById("is").className ='buttonlogin';//.style="background-color: #003153;color: #EDBB00;";
    document.getElementById("cu").className ='buttonlogin';//.style="background-color: #003153;color: #EDBB00;";

    document.getElementById(id).className = 'buttonlogin_selected';//.style="background-color: #EDBB00;color: #003153";
    window.sessionStorage.optionlogin=id;
    if (id=="cu"){
        document.getElementById("tr-cu").style.visibility = "visible";
       
    }else{
        document.getElementById("tr-cu").style.visibility = "hidden";
        
    }
}

function accept(){
    var op = window.sessionStorage.optionlogin;
    console.log("entramos accept "+op);
    if (op=='is'){
        //loaduser
        loadUser();
    }else{
        //saveuser
        saveUser();
    }
}

function saveUser(){
    console.log("entro en saveUser");
    var mail = document.getElementById("fmail").value;
    var fechanac=document.getElementById("fnac").value;
    var apodo=document.getElementById("apodo").value;

    //console.log("apodo->"+apodo);
   
    if (mail != null && mail.trim().length >0 && 
        fechanac!=null && fechanac.trim().length>0 && 
        apodo!=null && apodo.trim().length>0){

        mail = mail.trim();
        fechanac=fechanac.trim();
        apodo=apodo.trim();

        window.localStorage.setItem("mail",mail);
        window.localStorage.setItem("fnac",fechanac);
        window.localStorage.setItem("apodo",fechanac);
        //loadUserFB(mail, fechanac, true, apodo);
        console.log("guardo");
        //saveUserFB(mail,fechanac,apodo);
        existeUsuarioFB(mail,fechanac,apodo);
        

        //guardar en cloud
        //mostrarToast("datos guardados!!",3000); //mostramos 3 segundos
        //alert(mail+ " Datos guardados!!");
    }else{
        mostrarToast("es necesario informar mail, fecha de nacimiento <br> y apodo!",3000);
        //alert('Es necesario informar tanto mail como fecha de nacimiento');
    }
}

function saveUsuario(mail,fechanac,apodo){
    console.log("voy a guardar");
    var idusuario = saveUserFB(mail,fechanac,apodo);
    console.log(idusuario);

    window.localStorage.clave=idusuario;
    window.localStorage.mail=mail;
    window.localStorage.fnac =fechanac;
    window.localStorage.apodo =apodo;
}



function loadUser(){
    //guardamos el email antes de borrarlo todo
    console.log("entramos en loaduser");
    //mostrarToast("cargando información!!",6000);
    var mail = document.getElementById("fmail").value;
    var fechanac=document.getElementById("fnac").value;
    window.localStorage.setItem("mail",mail);
    window.localStorage.setItem("fnac",fechanac);
    mostrarToast("vamos a cargar los datos ...");
    loadUserFB(mail, fechanac, false);
    console.log("salimos loaduser");
    //
    //console.log("salimos");
}

function retloadUserFB(idusuario){
    //usuario cargado ahora tocar cargar su lista de retos
    
    getMisRetosFB(idusuario);
    mostrarToast("usuario cargado :)",3000);
}

function returngetMisRetosFB(listaretos){
    console.log("tengo "+listaretos.length+" retos");
    if (listaretos.length>0){ //si tenemos retos los guardamos
        window.localStorage.listamisretos = JSON.stringify(listaretos);
    }
}