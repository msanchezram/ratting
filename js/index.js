var menustate="";

function carga(){
    //console.log("entro carga de index");
    
    //de momento forzamos carga firebase
    getRetosFB();
    /*
    if (window.sessionStorage.listaretos==null){
        console.log("carga FB");
        getRetosFB();
    }else{
        console.log("carga memoria");
        cargaTablaRetos(JSON.parse(window.sessionStorage.listaretos));
    }
    */
    //console.log("fin carga");
}

function cargaTablaRetos(listaretos){
    if (listaretos.length>0){
        listaretos = limpiarlistaretos(listaretos);
        window.sessionStorage.listaretos = JSON.stringify(listaretos);
        for (var i=0;i<listaretos.length;i++){
            
            textoFecha="";
            obj=listaretos[i];
                        
            linea="<tr><td>";
            linea+="<a href=\"javascript:gotochallenge("+i+")\">";
            linea+="<table class='table_test'>";
            linea+="<tr><td><font style='font-weight: bold;font-size:24px;color: #12CAB3'>"+obj.nombre+"</font></td></tr>";                         
            linea+="<tr><td><font style='color: #DFDFDF'>"+obj.apodocreador+"</font>, dificultad <font style='color: #DFDFDF'>"+obj.dificultad+"</font> ("+obj.fecha+")</td></tr>";
                        
            linea+="</table>";
            //linea+="</a>";
            linea+="</a>";
            linea+="</td></tr>";                

            row = document.getElementById("tableretos").insertRow(0);
            row.innerHTML = linea;
                                
        }        
    }else{
        mostrarToast("no hay retos :(", 3000);        
    }
}

function limpiarlistaretos(listaretos){
    var lstmisretos = [];
    if (window.localStorage.listamisretos!=null){
        lstmisretos=JSON.parse(window.localStorage.listamisretos);
    }
    

    var lstretosfinal = [];
    var existe;
    for (var i=0;i<listaretos.length;i++){
        existe=false;
        for (var j=0;j<lstmisretos.length;j++){
            //console.log(listaretos[i].idreto+"=="+lstmisretos[j].idreto);
            if (listaretos[i].idreto==lstmisretos[j].idreto){
                console.log();
                existe=true;
            }
        }
        if (!existe){
            lstretosfinal.push(listaretos[i]);
        }
    }
    return lstretosfinal;
}

function gotochallenge(posreto){
    //alert(posreto);
    var listaretos = JSON.parse(window.sessionStorage.listaretos);
    window.sessionStorage.retoselected  = JSON.stringify(listaretos[posreto]);
    window.location.href="./reto.html";

}

function openNav() {
    if(menustate=="O"){
        closeNav();
       
    }else{
        document.getElementById("mySidenav").style.width = "80%";
        menustate="O";
    }
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    menustate="";
}


function myFunction(x) {
    openNav();
    x.classList.toggle("change");
}