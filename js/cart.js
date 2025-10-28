/*
<div class="card mb-3 divDeProducto snes-container my-3" style="max-width: 100%;">
        <div class="row g-0">
          <div class="col-md-4 bg-dark d-flex justify-content-center align-items-center divImagenProducto">
            <img src="${producto.imagen}" class="imgProducto img-fluid" alt="${producto.nombre}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div class="d-flex nombreYCantidad justify-content-between flex-column flex-lg-row">
                <h5>${producto.nombre}</h5>
                <div>
                  <label>Cantidad:</label>
                  <input type="number" name="cantidadField" id="cantidadField" value="${producto.cantidad}" style="width: 10%;">
                </div>
              </div>
              <div class="precioYMoneda my-2">
                <h5>${producto.moneda} ${producto.precio}</h5>
              </div>
              <div class="bottomDiv d-flex justify-content-between mt-2 mt-md-5 flex-column flex-md-row">
                <div class="subtotal">
                  <h5>Subtotal: ${producto.precio * producto.cantidad}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
*/

//Eso es el código html para cada casilla, los datos que tenes que completar están entre 4 #'s,
//Lo único que falta es que el Total no desaparezca cuando la pantilla es mediana o pequeña, y el mensaje cuando no hay productos en el carrito.

const contenedorProductos = document.getElementById("listadoCarrito");
const btnSeguirComprando = document.getElementById("btnSeguirComprando");
const btnContinuarPago = document.getElementById("btnContinuarPago");
const total = document.getElementById("total");
const productosGuardadosJSON = localStorage.getItem("productosEnCarrito");

if (!productosGuardadosJSON) {
  mostrarCarritoVacio();
} else {
  mostrarProductosEnCarrito();
}

function mostrarCarritoVacio() {
  contenedorProductos.classList.add("d-flex", "justify-content-center", "align-items-center");
  contenedorProductos.style.minHeight = "60vh";

  const mensaje = document.createElement("p");
  mensaje.textContent = "No hay productos en el carrito.";
  mensaje.classList.add("text-center", "fs-4");

  contenedorProductos.appendChild(mensaje);
}

function mostrarProductosEnCarrito() {
  const productos = JSON.parse(productosGuardadosJSON);
  productos.forEach(producto => {
    let divProducto = document.createElement("div");
    divProducto.className = "card mb-3 divDeProducto snes-container my-3"
    divProducto.style.maxWidth = "100%";


    divProducto.innerHTML = ` <div class="row g-0">
          <div class="col-md-4 d-flex justify-content-center align-items-center divImagenProducto">
            <img src="${producto.imagen}" class="imgProducto img-fluid" alt="${producto.nombre}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div class="d-flex nombreYCantidad justify-content-between flex-column flex-lg-row">
                <h5>${producto.nombre}</h5>
                <div style="padding: 0">
                  <label>Cantidad:</label>
                  <input type="number" name="cantidadField" class="cantidadField" value="${producto.cantidad}" style="width: 10%;">
                </div>
              </div>
              <div class="precioYMoneda my-2">
                <h5>${producto.moneda} ${producto.precio}</h5>
              </div>
              <div class="bottomDiv d-flex justify-content-between mt-2 mt-md-5 flex-column flex-md-row">
                <div class="subtotal">
                  <h5 class="subTotal" id="subTotal">Subtotal: ${producto.precio * producto.cantidad}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>`;

    contenedorProductos.append(divProducto);
    cargarTotal();

    let inputCantidad = divProducto.querySelector(".cantidadField");
    let subTotal = divProducto.querySelector(".subTotal");
    inputCantidad.addEventListener("input", () => {
      if (inputCantidad.value < 1) {
        inputCantidad.value = 1;
      }
      subTotal.innerHTML = "Subtotal: " + producto.precio * inputCantidad.value;

      cargarTotal();
      
      //actualizar badge live

      producto.cantidad = parseInt(inputCantidad.value);
      localStorage.setItem("productosEnCarrito", JSON.stringify(productos));

      actualizarBadgeCarrito();
    });
    


  });


  function cargarTotal() {
    let subTotales = document.querySelectorAll(".subTotal");
    total.innerHTML = "Total: 0";
    let totalNumero = 0;
    subTotales.forEach(subT => {
      totalNumero += parseInt(subT.textContent.split(" ")[1]);
    })

    total.innerHTML = "Total: " + totalNumero;
  }
}