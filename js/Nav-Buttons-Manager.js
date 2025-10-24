document.addEventListener("DOMContentLoaded", () => {

    checkLogin();
    cargarBtnCarrito();
    cargarUsuario();
    cargarBotonTheme();
});


//COMPRUEBA SI EL USUARIO ESTA LOGEADO, SI NO LO ESTÁ, LO REDERECCIONA A LA PANTALLA DE LOGIN

function checkLogin() {
    if (localStorage.getItem("loggedIn") == null || localStorage.getItem("loggedIn") === "false") {
        window.location.href = "login.html";
    }
}

//PARA CARGAR EL BOTON DE USUARIO

function cargarUsuario() {
    if (localStorage.getItem("username") == null) {
        return;
    }
    let navList = document.getElementById("navList");


    let elementoDeLista = document.createElement("li");
    elementoDeLista.classList.add("nav-item");


    let nombreDelUsuarioElemento = document.createElement("a");
    nombreDelUsuarioElemento.classList.add("nav-link");

    nombreDelUsuarioElemento.innerHTML = localStorage.getItem("username");
    nombreDelUsuarioElemento.href = "my-profile.html";

    elementoDeLista.appendChild(nombreDelUsuarioElemento);

    navList.appendChild(elementoDeLista);

}

//PARA CARGAR EL BOTON DE MODO OSCURO/CLARO
function cargarBotonTheme() {
    const html = document.documentElement;
    let theme = localStorage.getItem("theme") || "claro";
    html.setAttribute("data-theme", theme);
    const themeActual = html.getAttribute('data-theme');


    let navList = document.getElementById("navList");


    let elementoDeLista = document.createElement("li");
    elementoDeLista.classList.add("nav-item");


    let boton = document.createElement("button");
    boton.addEventListener("click", cambiarTheme);
    boton.classList.add("nav-link");
    boton.setAttribute("id", "botonTheme");

    boton.innerHTML = themeActual === "oscuro" ? "Modo: Oscuro" : "Modo: Claro";

    elementoDeLista.appendChild(boton);

    navList.appendChild(elementoDeLista);
}

function cargarBtnCarrito() {
    let navList = document.getElementById("navList");


    let elementoDeLista = document.createElement("li");
    elementoDeLista.classList.add("nav-item");


    elementoDeLista.innerHTML = `
                                <a href="cart.html" class="btn btn-outline-dark position-relative nav-link" id="carrito" style="background-color:var(--color-boton-2);">
                                    <img src="img/Carrito de compra.png" alt="Carrito" style="width:24px; height:24px; object-fit:contain;">
                                    <span class="badge position-absolute rounded-pill bg-danger translate-middle" style="color:white; top: 100%; left: 100%;">
                                    0
                                    </span>
                                </a>
                                `;

    navList.appendChild(elementoDeLista);
}




//FUNCIONALIDAD DEL BOTON OSCURO/CLARO
function cambiarTheme(event) {
    boton = event.currentTarget;
    html = document.documentElement;
    const themeActual = html.getAttribute('data-theme');
    const themeNuevo = themeActual === "claro" ? "oscuro" : "claro";

    localStorage.setItem("theme", themeNuevo);
    boton.innerHTML = localStorage.getItem("theme") === "oscuro" ? "Modo: Oscuro" : "Modo: Claro";


    html.setAttribute("data-theme", themeNuevo);
}