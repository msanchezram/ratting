var menustate="";

function carga(){
    //console.log("entro carga de index");
    var idusuario = window.localStorage.clave;
    
    if (window.localStorage.listamisretos==null){
        console.log("carga FB");
        console.log("idusario -> "+idusuario);
        getMisRetosFB(idusuario);
    }else{
        console.log("carga memoria");
        cargaTablaRetos(JSON.parse(window.localStorage.listamisretos));
    }

    //console.log("fin carga");
}
function salir(){
    window.document.location="./index.html";
}

function returngetMisRetosFB(listaretos){

    if (listaretos.length>0){
        cargaTablaRetos(listaretos);
    }else{
        mostrarToast("no tienes retos :(",3000);
    }
}

function cargaTablaRetos(listaretos){
    if (listaretos.length>0){
        window.localStorage.listamisretos = JSON.stringify(listaretos);
        for (var i=0;i<listaretos.length;i++){
            
            textoFecha="";
            obj=listaretos[i];
                        
            linea="<tr><td>";
            linea+="<a href=\"javascript:gotochallenge("+i+")\">";
            linea+="<table class='table_test'>";
            linea+="<tr><td><font style='font-weight: bold;font-size:24px;color: #12CAB3'>"+obj.nombre+"</font></td></tr>";                         
            linea+="<tr><td>"+descripcionEstado(obj.estado)+", dificultad <font style='color: #DFDFDF'>"+obj.dificultad+"</font> ("+obj.fechacreacion+")</td></tr>";
                        
            linea+="</table>";
            //linea+="</a>";
            linea+="</a>";
            linea+="</td></tr>";                

            row = document.getElementById("tableretos").insertRow(0);
            row.innerHTML = linea;
                                
        }
    }
}

function gotochallenge(posreto){
    //alert(posreto);
    var listaretos = JSON.parse(window.localStorage.listamisretos);
    window.sessionStorage.misretoselected  = JSON.stringify(listaretos[posreto]);
    window.location.href="./reto.html";
    console.log("gotochallenge");

}
