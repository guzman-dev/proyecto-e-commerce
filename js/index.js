document.addEventListener("DOMContentLoaded", function(){
    checkLogin();

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//Checkea si el usuario NO está logeado, y si no lo está, lo manda a la pagina de login.
function checkLogin(){
    if(sessionStorage.getItem("loggedIn") == null || sessionStorage.getItem("loggedIn") === "false"){
        window.location.href = "login.html";
    }
}

