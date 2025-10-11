document.addEventListener("DOMContentLoaded", ()=>{

    // Obtener elementos del HTML
    const inputNombre = document.getElementById("inputNombre");
    const inputApellido = document.getElementById("inputApellido");
    const inputEmail = document.getElementById("inputEmail");
    const inputTelefono = document.getElementById("inputTelefono");
    const inputFotoPerfil = document.getElementById("inputFotoPerfil");
    const fotoPerfilCargada = document.getElementById("fotoPerfil");
    const botonCambiarFoto = document.getElementById("botonCambiarFoto");
    const botonEditar = document.getElementById("botonEditar");

    // Precargar usuario email del localStorage (si existe) sino cargar el nombre de Usuario
    const nombreUsuario = localStorage.getItem("username");
    const emailGuardado = localStorage.getItem("email");
    if(emailGuardado){
        inputEmail.value = emailGuardado;
    }else{
        inputEmail.value = nombreUsuario;
    }

    // Precargar foto guardada en el localStorage
    const fotoGuardada = localStorage.getItem("fotoPerfil");
    if(fotoGuardada){
        fotoPerfilCargada.src = fotoGuardada;
    }
    
    // Ocultar boton cambiarFoto hasta que se presione el boton editar
    botonCambiarFoto.style.display="none";

    // Obtener datos del localStorage y precargarlos
    inputNombre.value = localStorage.getItem("nombre") || "";
    inputApellido.value = localStorage.getItem("apellido") || "";
    inputTelefono.value = localStorage.getItem("telefono") || "";

    // Obtener todos los inputs
    const inputs = document.querySelectorAll("#contenedorCampos input");

    botonEditar.addEventListener("click", (e)=>{
        // Evitar que se envíe el formulario
        e.preventDefault();

        if(botonEditar.textContent === "Editar"){
            // Recorrer el arreglo de inputs
            inputs.forEach(input =>{
                input.disabled = false;
            });
            // Cambiar el mensaje del boton a "Guardar cambios"
            botonEditar.textContent = "Guardar cambios";
            // Mostrar botón para cambiar la imagen
            botonCambiarFoto.style.display="block";
        }else{
            // Guardar datos en el localStorage
            localStorage.setItem("nombre", inputNombre.value);
            localStorage.setItem("apellido", inputApellido.value);
            localStorage.setItem("email", inputEmail.value);
            localStorage.setItem("telefono", inputTelefono.value);

            // Deshabilitar los inputs
            inputs.forEach(input => input.disabled = true);

            // Cambiar el mensaje del boton a "Editar"
            botonEditar.textContent = "Editar";
            // Ocultar boton de cambiar imagen
            botonCambiarFoto.style.display="none";
        }
    });

    // Escuchar cuando se seleccione una imagen
    inputFotoPerfil.addEventListener("change", ()=>{
        // Obtener el archivo que se selecciona
        const archivo = inputFotoPerfil.files[0];
        // Si hay un archivo seleccionado
        if(archivo){
            // Crear una instancia de FileReader para leer archivos
            const lectorArchivos = new FileReader();
            // Crear manejador para el evento onload (cuando cargamos el archivo)
            lectorArchivos.onload = (e) => {
                // Asignamos el resultado de la lectura del archivo al source de la foto de perfil cargada actualmente
                fotoPerfilCargada.src = e.target.result;
                // Guardamos la imagen en el localStorage
                localStorage.setItem("fotoPerfil", e.target.result);
            };
            // Lee la imagen como base64
            lectorArchivos.readAsDataURL(archivo);
        }
    });
});