document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-login');
  const botonIngresar = document.getElementById("boton-ingresar");
  const contrasenia = document.getElementById("contrasenia");
  const usuario = document.getElementById("usuario");

  function validarUsuario() {
    return usuario.value.trim().length > 0;
  }

  function validarContrasenia() {
    return contrasenia.value.length > 6;
  }

  function validarCredenciales(event) {
    if (!validarUsuario() || !validarContrasenia()) {
        event.preventDefault(); //Previene el redireccionamiento
        alert("datos inválidos.");
    }
  }
  form.addEventListener('submit', validarCredenciales)
});