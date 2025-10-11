document.addEventListener("DOMContentLoaded", checkLogin);

function checkLogin() {
    if (localStorage.getItem("loggedIn") == null || localStorage.getItem("loggedIn") === "false") {
        window.location.href = "login.html";
    }
}
cargarUsuario();

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