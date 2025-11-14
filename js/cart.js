//ELEMENTOS DEL CARRITO
const contenedorProductos = document.getElementById("listadoCarrito");
const btnSeguirComprando = document.getElementById("btnSeguirComprando");
const total = document.getElementById("total");
const productosGuardadosJSON = localStorage.getItem("productosEnCarrito");

//ELEMENTOS DE LA FACTURACIÓN
//Inputs
const inputEnvio = document.getElementById("inputEnvio");
const inputDepartamento = document.getElementById("inputDepartamento");
const inputLocalidad = document.getElementById("inputLocalidad");
const inputCalle = document.getElementById("inputCalle");
const inputNumero = document.getElementById("numero");
const inputEsquina = document.getElementById("esquina");
const inputFormaPago = document.getElementById("inputFormaPago");
const datosTarjeta = document.getElementById("datosTarjeta");
const separadorTarjeta = document.getElementById("separadorTarjeta");
const camposTarjeta = datosTarjeta.querySelectorAll("input");
datosTarjeta.classList.add("oculto");
separadorTarjeta.classList.add("oculto");

//Subtotal, Costo de envio, y Total de la compra
const compraSubTotal = document.getElementById("compraSubTotal");
const compraCostoEnvio = document.getElementById("compraCostoEnvio");
const compraTotal = document.getElementById("compraTotal");
const btnFinalizarCompra = document.getElementById("btnFinalizarC");

//Toast
const toastElem = document.getElementById("toastCompraExitosa");
const toast = new bootstrap.Toast(toastElem, {autohide: true, delay: 4000});

function comprobarJsonCarritos() {
  const divDeDatos = document.getElementById("divDeDatos");

  if (!productosGuardadosJSON || productosGuardadosJSON === "[]") {
    mostrarCarritoVacio();
    divDeDatos.classList.add("oculto"); //Oculta el apartado 'Datos de compra'
    total.classList.add("oculto"); //Oculta el texto 'Total'
  } else {
    mostrarProductosEnCarrito();
    divDeDatos.classList.remove("oculto");
    total.classList.remove("oculto");
  }
}

comprobarJsonCarritos();

btnSeguirComprando.addEventListener("click", () => {
  window.location = "products.html";
});

function mostrarCarritoVacio() {
  contenedorProductos.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  contenedorProductos.style.minHeight = "60vh";

  const mensaje = document.createElement("p");
  mensaje.textContent = "No hay productos en el carrito.";
  mensaje.classList.add("text-center", "fs-4");

  contenedorProductos.appendChild(mensaje);
}

function mostrarProductosEnCarrito() {
  contenedorProductos.innerHTML = "";
  const productos = JSON.parse(productosGuardadosJSON);

  productos.forEach((producto) => {
    let divProducto = document.createElement("div");
    divProducto.className = "card mb-3 divDeProducto snes-container my-3";
    divProducto.style.maxWidth = "100%";

    divProducto.innerHTML = `
      <div class="row g-0 container">
        <div class="col-md-4 d-flex justify-content-center align-items-center divImagenProducto">
          <img src="${producto.imagen}" class="imgProducto img-fluid" alt="${producto.nombre}">
        </div>
        <div class="col-md-8 contenedorInfoProducto">
          <div class="card-body">
            <div class="d-flex nombreYCantidad justify-content-between flex-column flex-lg-row">
              <h5>${producto.nombre}</h5>
              <div style="padding: 0">
                <label>Cantidad:</label>
                <input type="number" name="cantidadField" class="cantidadField" value="${producto.cantidad}" style="width: 5vw;">
              </div>
            </div>
            <div class="precioYMoneda my-2">
              <h5 class="productoPrecio">${producto.moneda} ${producto.precio}</h5>
            </div>
            <div class="bottomDiv d-flex justify-content-between mt-2 mt-md-5 flex-column flex-md-row ">
              <div class="subtotal">
                <h5 class="subTotal" id="subTotal">Subtotal: ${producto.precio * producto.cantidad}</h5>
              </div>
              <div class="snes-button" id="quitarProd">
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M16 2v4h6v2h-2v14H4V8H2V6h6V2h8zm-2 2h-4v2h4V4zm0 4H6v12h12V8h-4zm-5 2h2v8H9v-8zm6 0h-2v8h2v-8z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    contenedorProductos.append(divProducto);
    
    let inputCantidad = divProducto.querySelector(".cantidadField");
    let subTotal = divProducto.querySelector(".subTotal");

    inputCantidad.addEventListener("input", () => {
      if (inputCantidad.value < 1) inputCantidad.value = 1;

      const subtotalNum = producto.precio * inputCantidad.value;
      subTotal.innerHTML = `Subtotal: ${formatearNumero(subtotalNum)}`;

      recargarTotales();
      producto.cantidad = parseInt(inputCantidad.value);
      localStorage.setItem("productosEnCarrito", JSON.stringify(productos));
      actualizarBadgeCarrito();
    });
    
    const quitarProducto = divProducto.querySelector("#quitarProd");
    quitarProducto.addEventListener("click", () => {
      divProducto.remove();
      const index = productos.indexOf(producto);
      if (index > -1) productos.splice(index, 1);
      localStorage.setItem("productosEnCarrito", JSON.stringify(productos));
      actualizarBadgeCarrito();
      window.location = "cart.html";
    });
  });
  
  formatearPreciosDinamicos();
  recargarTotales();
}

//FUNCIÓN PARA REFRESCAR LOS COSTOS Y TOTALES EN EL CARRITO Y LA FACTURACIÓN
function recargarTotales() {
  const subTotales = document.querySelectorAll(".subTotal");
  let subTotalNumero = 0;

  subTotales.forEach((subT) => {
    const limpio = subT.textContent.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
    const num = parseFloat(limpio);
    subTotalNumero += isNaN(num) ? 0 : num;
  });

  const envioSeleccionado = inputEnvio?.value;
  let costoDeEnvio = 0;
  if (envioSeleccionado === "standard") costoDeEnvio = subTotalNumero * 0.05;
  if (envioSeleccionado === "express") costoDeEnvio = subTotalNumero * 0.07;
  if (envioSeleccionado === "premium") costoDeEnvio = subTotalNumero * 0.15;

  const totalConEnvio = subTotalNumero + costoDeEnvio;

  //Carrito
  total.innerHTML = `Total: ${formatearNumero(subTotalNumero)}`;

  //Facturación
  compraSubTotal.innerHTML = `Subtotal: ${formatearNumero(subTotalNumero)}`;
  compraCostoEnvio.innerHTML = `Costo de envío: ${formatearNumero(costoDeEnvio)}`;
  compraTotal.innerHTML = `Total a pagar: ${formatearNumero(totalConEnvio)}`;
}

//FUNCIONALIDAD DE LA FACTURACIÖN

inputEnvio.addEventListener("change", recargarTotales);

//Seleciona el formulario del DOM para manipularlo
const form = document.querySelector("form");

//FUNCIÓN PARA VALIDAR LOS CAMPOS DEL FORMULARIO

function validarCampos() {
  //Elimina mensajes de error
  form.querySelectorAll(".mensaje-error").forEach((msj) => msj.remove());
  form.querySelectorAll("input, select").forEach((campo) => {
    campo.classList.remove("campo-error");
  });

  //Selecciona todos los campos obligatorios del formulario
  const camposObligatorios = form.querySelectorAll(
    "input[required], select[required]"
  );

  //Variable para saber si hay algún campo vacío
  let estaVacio = false;

  //Recorre todos los campos obligatorios
  camposObligatorios.forEach((campo) => {
    if (!campo.value.trim()) { //Si el campo está vacío...
      estaVacio = true; //Marca que hay al menos un campo vacío
      campo.classList.add("campo-error"); //Aplica estilo al campo vacío con la clase 'campo-error'

      const mensaje = document.createElement("p"); //Crea un párrafo para el mensaje de error
      mensaje.textContent = "Este campo es obligatorio"; //Texto del mensaje
      mensaje.classList.add("mensaje-error"); //Aplica la clase 'mensaje-error' al mensaje
      campo.insertAdjacentElement("afterend", mensaje); //Inserta el mensaje a continuación del campo
    }

    //Escucha el evento 'input' en los campos
    campo.addEventListener("input", () => {
      if (campo.value.trim()) { //Si el campo NO está vacío
        campo.classList.remove("campo-error"); //Quita el estilo de error
        campo.nextElementSibling?.classList?.contains("mensaje-error") && //Si tiene un mensaje de error...
          campo.nextElementSibling.remove(); //Lo elimina
      }
    });
  });

  // Si hay campos vacíos, devuelve false
  return !estaVacio;
}

// Escucha el evento 'click' en el botón de finalizar compra
btnFinalizarCompra.addEventListener("click", (e) => {
  e.preventDefault(); // Evita que se envíe el formulario

  // Si hay campos vacíos, se interrumpe el flujo y no se finaliza la compra
  if (!validarCampos()) return;

  // Si todo está correcto se muestra una notificacion con el mensaje de éxito
  toast.show();
});

// Mostrar u ocultar datos de tarjeta según forma de pago
inputFormaPago.addEventListener("change", () => {
  if (inputFormaPago.value === "tar") {
    datosTarjeta.classList.remove("oculto");
    separadorTarjeta.classList.remove("oculto");
    camposTarjeta.forEach(c => c.setAttribute("required", "true"));
  } else {
    datosTarjeta.classList.add("oculto");
    separadorTarjeta.classList.add("oculto");
    camposTarjeta.forEach(c => c.removeAttribute("required"));
  }
});

function formatearNumero(num, esUSD = false) {
  if (num === null || num === undefined) return "";

  const limpio = String(num)
    .replace(/[^0-9,.-]/g, "")
    .replace(/\.(?=.*\.)/g, "")
    .replace(",", ".");
  
  const n = parseFloat(limpio);
  if (isNaN(n)) return num;

  const texto = n.toLocaleString(esUSD ? "en-US" : "es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return texto.replace(/([.,]00)$/, ""); // elimina ",00" o ".00" si son ceros exactos
}

function formatearPreciosDinamicos() {
  const precios = document.querySelectorAll(
    ".precio, .subTotal, .totalLabel, #total, .productoPrecio, #compraSubTotal, #compraCostoEnvio, #compraTotal"
  );

  precios.forEach((p) => {
    let texto = p.textContent.trim();

    // Detecta si el texto tiene "USD"
    const esUSD = texto.includes("USD");

    // Formatea todos los números dentro del texto
    texto = texto.replace(/(\d[\d.,]*)/g, (coincidencia) => {
      return formatearNumero(coincidencia, esUSD);
    });

    p.textContent = texto;
  });
}
