document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const contrasenia = document.getElementById("contrasenia");
  const usuario = document.getElementById("usuario");

  function validarUsuario() {
    if (usuario.value.trim().length === 0) {
      usuario.setCustomValidity('Este campo no puede estar vacio');
      return false;
    }
    usuario.setCustomValidity('');
    return true;
  }

  function validarContrasenia() {
    if (contrasenia.value.trim().length === 0) {
      contrasenia.setCustomValidity('Este campo no puede estar vacio');
      return false;
    }
    contrasenia.setCustomValidity('');
    return true;
  }

  function validarCredenciales(event) {
    const usuarioValido = validarUsuario();
    const contraseniaValida = validarContrasenia();

    if (!usuarioValido || !contraseniaValida) {
      event.preventDefault(); // Evita el envío
      form.reportValidity(); // Muestra el popup de los elementos del form
    }

  }
  form.addEventListener('submit', validarCredenciales);
  usuario.addEventListener('input', validarUsuario);
  contrasenia.addEventListener('input', validarContrasenia);
});