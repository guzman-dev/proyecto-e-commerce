document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-login');
  const contrasenia = document.getElementById("contrasenia");
  const usuario = document.getElementById("usuario");

  function validarUsuario() {
    if (usuario.value.trim().length == 0) {
      usuario.setCustomValidity('El usuario debe tener más de 3 caracteres.');
      return false;
    }
    usuario.setCustomValidity('');
    return true;
  }

  function validarContrasenia() {
    if (contrasenia.value.length < 6) {
      contrasenia.setCustomValidity('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    contrasenia.setCustomValidity('');
    return true;
  }

  function validarCredenciales(event) {
    if (!validarUsuario() || !validarContrasenia()) {
        event.preventDefault(); //Previene el redireccionamiento
        alert("datos inválidos.");
    }
  }
  form.addEventListener('submit', validarCredenciales)
});