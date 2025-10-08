document.addEventListener("DOMContentLoaded", cargarBotonTheme);

function cargarBotonTheme(){
    const html = document.documentElement;
    html.setAttribute("data-theme", localStorage.getItem("theme"));


    let navList = document.getElementById("navList");


    let elementoDeLista = document.createElement("li");
    elementoDeLista.classList.add("nav-item");


    let boton = document.createElement("button");
    boton.addEventListener("click", cambiarTheme);
    boton.classList.add("nav-link");
    boton.setAttribute("id", "botonTheme");

    boton.innerHTML = localStorage.getItem("theme") === "oscuro" ? "Modo: Oscuro" : "Modo: Claro";

    elementoDeLista.appendChild(boton);

    navList.appendChild(elementoDeLista);
}

function cambiarTheme(event){
    boton = event.currentTarget;
    html = document.documentElement;
    const themeActual = html.getAttribute('data-theme');
    const themeNuevo = themeActual === "claro" ? "oscuro" : "claro";

    localStorage.setItem("theme", themeNuevo);
    boton.innerHTML = localStorage.getItem("theme") === "oscuro" ? "Modo: Oscuro" : "Modo: Claro";


    html.setAttribute("data-theme", themeNuevo);
}