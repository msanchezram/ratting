function carga(){
   
   
    
}


function borrarDatosCache(){
    //guardamos el email antes de borrarlo todo
    var mail =window.localStorage.getItem("mail");
    var fnac=window.localStorage.getItem("fnac");
    
    window.localStorage.clear();
    window.sessionStorage.clear();
    //este no lo borra
    window.sessionStorage.removeItem("listaretos");

    window.localStorage.setItem("mail",mail);
    window.localStorage.setItem("fnac",fnac);
}