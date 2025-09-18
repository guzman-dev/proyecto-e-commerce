document.addEventListener("DOMContentLoaded", checkLogin);

function checkLogin() {
    if (sessionStorage.getItem("loggedIn") == null || sessionStorage.getItem("loggedIn") === "false") {
        window.location.href = "login.html";
    }
}
cargarUsuario();

function cargarUsuario() {
    if (sessionStorage.getItem("username") == null) {
        return;
    }
    let navList = document.getElementById("navList");


    let elementoDeLista = document.createElement("li");
    elementoDeLista.classList.add("nav-item");


    let nombreDelUsuarioElemento = document.createElement("a");
    nombreDelUsuarioElemento.classList.add("nav-link");

    nombreDelUsuarioElemento.innerHTML = sessionStorage.getItem("username");
    nombreDelUsuarioElemento.href = "#";

    elementoDeLista.appendChild(nombreDelUsuarioElemento);

    navList.appendChild(elementoDeLista);

}