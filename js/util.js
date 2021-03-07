function mostrarToast(mensaje,tiempo){
    var x = document.getElementById("snackbar");
    x.innerHTML=mensaje;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, tiempo);
}

//ejemplo de Sleep
function sleep (miliseconds) {
    setTimeout(function(){ console.log("fin sleep");},miliseconds);
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panelacordeon = this.nextElementSibling;
    if (panelacordeon.style.display === "block") {
        panelacordeon.style.display = "none";
    } else {
        panelacordeon.style.display = "block";
    }
  });
}

function limpiarTablaResultados(nombreTabla){

    for(var i=document.getElementById(nombreTabla).rows.length;i>0;i--) {
        document.getElementById(nombreTabla).deleteRow(i-1);
    }
}

function cerrarModal(){
    modal.style.display = "none";
}

function celdaCargando(nombreTabla){
    linea="<td>";
    //linea+="<a href='javascript:editplayer("+i+");'>";
    linea+="<table class='table_test'>";

    linea+="<tr><td><font style='font-weight: bold;font-size:16px;color: rgb(65, 203, 254)'>Cargando información</font> <img class='imgIcono4' style='float:right;cursor:pointer' src='./images/loading.gif' ></td></tr>"

    //linea+="<tr><td><font style='font-weight: bold;font-size:24px;color: rgb(65, 203, 254)'>"+obj.apodofollower+"</font>";        
    //linea+="</td></tr>";
    //linea+="<tr><td><font style='font-weight: bold;font-size:24px;color: rgb(65, 203, 254)'>"+obj.nombre+"</font> <span  style='float:right;cursor:pointer;text-align:right;color:#FFFFFF;font-size:16px;font-weight: bold;'>"+obj.followers+"<img class='imgIcono4' style='vertical-align:bottom;' src='./images/followers.png'></span></td></tr>";
    //linea+="<tr><td><font style='font-size:14px;color: #FFFFFF'>"+obj.fechafollow+"</font></td></tr>";
    //linea+="<tr><td><font style='font-size:14px;'>"+obj.categoria+" Nivel "+obj.nivel+"</font><font style='font-size:12px;'> ("+estado+")</font></td></tr>";
    linea+="</table>";
    //linea+="</a>";
    linea+="</td>";
    var row = document.getElementById(nombreTabla).insertRow(0);
    row.innerHTML = linea;  
}

function inhabilitarIconoCargando(nombre){
    document.getElementById(nombre).style.visibility="hidden";
}
function habilitarIconoCargando(nombre){
    document.getElementById(nombre).style.visibility="visible";
}


function numberToString(num)
{
    let numStr = String(num);

    if (Math.abs(num) < 1.0)
    {
        let e = parseInt(num.toString().split('e-')[1]);
        if (e)
        {
            let negative = num < 0;
            if (negative) num *= -1
            num *= Math.pow(10, e - 1);
            numStr = '0.' + (new Array(e)).join('0') + num.toString().substring(2);
            if (negative) numStr = "-" + numStr;
        }
    }
    else
    {
        let e = parseInt(num.toString().split('+')[1]);
        if (e > 20)
        {
            e -= 20;
            num /= Math.pow(10, e);
            numStr = num.toString() + (new Array(e + 1)).join('0');
        }
    }

    return numStr;
}

function getTodayFechaParseada(){
    var d = new Date();
    var dia="0";
    var mes ="0";
    if (d.getDate()<10){
        dia+=d.getDate();
    }else{
        dia=d.getDate();
    }
    if (d.getMonth()<9){
        mes+=d.getMonth()+1;
    }else{
        mes=d.getMonth()+1;
    }
    return dia+"/"+mes+"/"+d.getFullYear();
}

function getNumeroDecimal(numero, precision){
    if (numero-parseInt(numero)>0){
        return numero.toPrecision(precision);
    }
    return numero;
}

function validaTexto(dato){
    if (dato!=null && dato.trim().length>0){
        return true;
    }
    return false;

}

function validaEsNumero(dato){
    if (dato!=null && dato.trim().length>0){
        return !isNaN(parseInt(dato)) && isFinite(dato);
    }
    return false;

}

function descripcionEstado(estado){
    if (estado==0){
        return "<font class='font_estado_pendiente'>Pendiente superar</font>";
    }else{
        return "<font class='font_estado_superado'>Reto superado</font>";
    }
}

