function carga(){
    console.log("carga verprevio");
    var reto;      

    if (window.sessionStorage.verreto!=null){
        reto=JSON.parse(window.sessionStorage.verreto);
        
        console.log(reto);

        var timeini= reto.inicio;
        var timefin= reto.final;
        document.getElementById("nombre").innerHTML=reto.nombre;                
        //https://www.youtube.com/embed/U5SGvQ-hONI?autoplay=1&mute=1&start=120&end=180&version=3&loop=1
        
        var urlReto = reto.url+"?autoplay=1&mute=1&start="+timeini+"&end="+timefin+"&version=3&loop=1&output=embed'";
    
        console.log(urlReto);
        var frame = document.getElementById("reto_frame");
        frame.src=urlReto;

    }else{
        mostrarToast("error, vuelve a crear reto",3000)
    }
    
}

function salir(){
   
   //window.sessionStorage.removeItem("verreto");  
   window.document.location="./crearreto.html";  
}

