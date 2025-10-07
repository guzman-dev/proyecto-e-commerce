document.addEventListener("DOMContentLoaded", cargarBotonTheme);

function cargarBotonTheme(){
    let navList = document.getElementById("navList");


    let elementoDeLista = document.createElement("li");
    elementoDeLista.classList.add("nav-item");


    let boton = document.createElement("button");
    boton.addEventListener("click", cambiarTheme);
    boton.classList.add("nav-link");
    boton.setAttribute("id", "botonTheme");

    if(localStorage.getItem("theme") == "claro"){
        boton.innerHTML = "Modo: Claro";
    }else{
        boton.innerHTML = "Modo: Claro";
    }

    elementoDeLista.appendChild(boton);

    navList.appendChild(elementoDeLista);
}

function cambiarTheme(event){
    boton = event.currentTarget;
    html = document.documentElement;
    const themeActual = html.getAttribute('data-theme');
    const themeNuevo = themeActual === "claro" ? "oscuro" : "claro";
    
    boton.innerHTML = boton.innerHTML === "Modo: Claro" ? "Modo: Oscuro" : "Modo: Claro";


    html.setAttribute("data-theme", themeNuevo);
}