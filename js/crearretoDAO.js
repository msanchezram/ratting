//importamos firebase
document.write("<script type='text/javascript' src='./js/firebase.js'></script>");

function retoDTOObj(obj){
    console.log("entro en DTO obj");
    var reto = {}; 

    reto.nombre = obj.val().nombre;
    reto.url= obj.val().url;
    reto.dificultad=obj.val().dificultad;
    reto.inicio= obj.val().inicio;
    reto.final=obj.val().final;
    reto.apodocreador=obj.val().apodocreador;
    reto.idusuario=obj.val().idusuario;
    reto.fecha = obj.val().fecha;

    reto.idreto=obj.key;    

    return reto;
}

function retoDTO(nombre, url, dificultad, inicio, final, apodocreador, idusuario , fecha){
    //console.log("entro en DTO variables");
    var reto = {}; 

    reto.nombre = nombre;
    reto.url= url;
    reto.dificultad=dificultad;
    reto.inicio= inicio;
    reto.final=final;
    reto.apodocreador=apodocreador;
    reto.idusuario=idusuario;
    reto.fecha=fecha;

    return reto;

}

function saveRetoFB(reto){
    if (!firebase.apps.length) {
        
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }

    var retoref= firebase.database().ref("retos");

    retoref.push ({

        nombre : reto.nombre,
        url : reto.url,
        dificultad:reto.dificultad,
        inicio : reto.inicio,
        final : reto.final,
        apodocreador :  reto.apodocreador,
        idusuario : reto.idusuario,
        fecha : reto.fecha
        
    });
    mostrarToast("reto registrado :)",3000);
}

function getRetosFB(){
    if (!firebase.apps.length) {
        
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }
    var listaretos = [];
    var reto;

    var retossref = firebase.database().ref("retos");    
  
    retossref.once('value', (snapshot) => {
        var listaretos = [];
        var reto;
        console.log("entro en value");
        snapshot.forEach((childSnapshot) => {
            
            reto = retoDTOObj(childSnapshot);
            //console.log(childSnapshot);
            //console.log(reto);
            listaretos.push(reto);
            //var childKey = childSnapshot.key;
            //var childData = childSnapshot.val();
            // ...
        });
        cargaTablaRetos(listaretos);
      });
}

function retoUsuarioDTO(idusuarioreto, idreto, url, dificultad, inicio, 
                        final, apodocreador, idusuariocreador , fechareto, estado,
                        urlretosuperado, fechacreacion, nombre,fecharetosuperado){
    //console.log("entro en DTO variables");
    var retousuario = {}; 

    retousuario.idusuarioreto = idusuarioreto;
    retousuario.idreto = idreto;
    retousuario.url= url;
    retousuario.dificultad=dificultad;
    retousuario.inicio= inicio;
    retousuario.final=final;
    retousuario.apodocreador=apodocreador;
    retousuario.idusuariocreador=idusuariocreador;
    retousuario.fechareto=fechareto;
    retousuario.estado=estado; //0 -> Pendiente; 1 -> Superado
    retousuario.urlretosuperado= urlretosuperado;
    retousuario.fechacreacion=fechacreacion;
    retousuario.nombre=nombre;
    retousuario.fecharetosuperado=fecharetosuperado;

    return retousuario;

}

function retoUsuarioDTOObj(obj){
    var retousuario ={};

    retousuario.idusuarioreto = obj.val().idusuarioreto;
    retousuario.idreto = obj.val().idreto;
    retousuario.url= obj.val().url;
    retousuario.dificultad=obj.val().dificultad;
    retousuario.inicio= obj.val().inicio;
    retousuario.final=obj.val().final;
    retousuario.apodocreador=obj.val().apodocreador;
    retousuario.idusuariocreador=obj.val().idusuariocreador;
    retousuario.fechareto=obj.val().fechareto;
    retousuario.estado=obj.val().estado; //0 -> Pendiente; 1 -> Superado
    retousuario.urlretosuperado= obj.val().urlretosuperado;
    retousuario.fechacreacion=obj.val().fechacreacion;
    retousuario.nombre=obj.val().nombre;
    retousuario.fecharetosuperado=obj.val().fecharetosuperado;
    
    retousuario.idusuarioretos = obj.key; 

    return retousuario;
}

function saveRetoUsuarioFB(retousuario){
    if (!firebase.apps.length) {
        
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }

    var usuariosref = firebase.database().ref("usuarioretos");

    var res =     usuariosref.push ({
        idusuarioreto : retousuario.idusuarioreto,
        idreto : retousuario.idreto,
        url:  retousuario.url,
        dificultad: retousuario.dificultad,
        inicio:  retousuario.inicio,
        final: retousuario.final,
        apodocreador: retousuario.apodocreador,
        idusuariocreador: retousuario.idusuariocreador,
        fechareto: retousuario.fechareto,
        estado: retousuario.estado, 
        urlretosuperado:  retousuario.urlretosuperado,
        fechacreacion: retousuario.fechacreacion,
        nombre:retousuario.nombre,
        fecharetosuperado:retousuario.fecharetosuperado
    }).key;
    //});
    //mostrarToast("usuario registrado :)",3000);
    return res;
}

function getMisRetosFB(idusuario){
    if (!firebase.apps.length) {
        
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }

    var usuarioretos = firebase.database().ref("usuarioretos");
    var listaretos=[];

    usuarioretos.orderByChild("idusuarioreto").equalTo(idusuario).on("child_added", function(data) {
        listaretos.push(retoUsuarioDTOObj(data));
    });

    usuarioretos.once('value', (snapshot) => {
        returngetMisRetosFB(listaretos);
    });
}

function updateRetoUsuarioFB (usuarioreto){
    if (!firebase.apps.length) {
        
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }

    var usuarioretosref = firebase.database().ref("usuarioretos/"+usuarioreto.idusuarioretos);

    usuarioretosref.update({
        idusuarioreto : usuarioreto.idusuarioreto,
        idreto : usuarioreto.idreto,
        url:  usuarioreto.url,
        dificultad: usuarioreto.dificultad,
        inicio:  usuarioreto.inicio,
        final: usuarioreto.final,
        apodocreador: usuarioreto.apodocreador,
        idusuariocreador: usuarioreto.idusuariocreador,
        fechareto: usuarioreto.fechareto,
        estado: usuarioreto.estado, 
        urlretosuperado:  usuarioreto.urlretosuperado,
        fechacreacion: usuarioreto.fechacreacion,
        nombre: usuarioreto.nombre,
        fecharetosuperado: usuarioreto.fecharetosuperado
    });

    usuarioretosref.once("value",function(snap2){
        console.log("update usuarioretos ok");
        retUpdateRetoUsuario();
    }); 

}

function deleteasignacionretoFB(idusuarioretos){
    if (!firebase.apps.length) {        
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }

    var usuarioretos = firebase.database().ref("usuarioretos/"+idusuarioretos);
    
    usuarioretos.remove().then(function() {
        //console.log("Remove "+key+" succeeded.");
        retDeleteasignacionretoFB();
        
    })
    .catch(function(error) {                
        console.log("Remove "+idusuarioretos+" failed: " + error.message);
        mostrarToast("Remove "+idusuarioretos+" failed: " + error.message, 5000);        
    });       
}

function deleteretoFB(idreto){
    if (!firebase.apps.length) {        
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }

    var retosref = firebase.database().ref("retos/"+idreto);
    
    retosref.remove().then(function() {
        console.log("Remove "+idreto+" succeeded.");
        retDeleteretoFB();
        
    })
    .catch(function(error) {                
        console.log("Remove "+idretos+" failed: " + error.message);
        mostrarToast("Remove "+idretos+" failed: " + error.message, 5000);        
    });       
}
