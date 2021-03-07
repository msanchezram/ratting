//importamos firebase
document.write(`<script type='text/javascript' src='./js/firebase.js'></script>`)


function usuarioDTO(obj) {
    var usuario = {}; 

    usuario.apodo = obj.val.apodo;
    usuario.mail= obj.val.mail;
    usuario.fechanacimiento=obj.val.fechanacimiento;
    usuario.userid=obj.key;

    return usuario;
}

function saveUserFB(mail,fechanac,apodo){

    if (!firebase.apps.length) {
        console.log("entro en config");
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }
    console.log("inserto usuarios");
    var usuariosref = firebase.database().ref("usuarios");

    var res = usuariosref.push ({
        mail: mail,
        fechanacimiento: fechanac,
        apodo : apodo
    }).key;
    mostrarToast("usuario registrado :)",3000);
    return res;
}

function existeUsuarioFB(mail,fechanac,apodo){

    var num=0;
    if (!firebase.apps.length) {
        console.log("entro en config");
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }
    var usersref = firebase.database().ref("usuarios");    

    usersref.orderByChild("mail").equalTo(mail).on("child_added", function(data) {
        //console.log("entro ->"+data);
        num=1;       
    }); 

    usersref.once("value", function(data2) {
        //console.log("entro en value");
        if (!num>0){ //si entra es porque ya existe
            saveUsuario(mail,fechanac,apodo); //metodo de login.js
            //
            //saveUserFB(mail,fechanac,apodo);
        }else{
            mostrarToast("el usuario "+mail+" ya existe :(",3000);
        }        
    });
}

function loadUserFB(mail, fnac){
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }
    var usersref = firebase.database().ref("usuarios");
    //var tmpmail="";
    var tmpfechanac="";
    var tmpapodo="";
    var clave="";
    var count=0;
    
    usersref.orderByChild("mail").equalTo(mail).on("child_added", function(data) {
        count++;
        //console.log("Equal to filter: " + data.val().mail+" - "+data.val().fechanacimiento+"-"+data.key);
        tmpfechanac=data.val().fechanacimiento;
        tmpapodo=data.val().apodo;
        if (tmpfechanac==fnac){
            //usuario encontrado, guardamos su key
            clave=data.key;                
        }
        
        //TO DO: cargar players?
        if (clave.length>0){
            
            window.localStorage.clave=clave;   
            window.localStorage.apodo=tmpapodo;
            
            retloadUserFB(clave);

        }else{
            mostrarToast("usuario "+mail+" con fecha nacimiento "+fnac+" no existe!",3000);
        }
       
    }); 
}
