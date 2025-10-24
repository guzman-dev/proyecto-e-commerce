/*
<div class="card mb-3 divDeProducto snes-container my-3" style="max-width: 100%;">
            <div class="row g-0">
              <div class="col-md-4 bg-dark d-flex justify-content-center align-items-center divImagenProducto">
                <img src="img/foto-perfil.jpg" class="imgProducto img-fluid" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <div class="d-flex nombreYCantidad justify-content-between flex-column flex-lg-row">
                    <h5>####Nombre####</h5>
                    <h5>####Cantidad: 2####</h5>
                  </div>
                  <div class="precioYMoneda my-2">
                    <h5>####$U 2000####</h5>
                  </div>
                  <div class="bottomDiv d-flex justify-content-between mt-2 mt-md-5 flex-column flex-md-row">
                    <div class="subtotal">
                      <h5>####Subtotal: 2000####</h5>
                    </div>
                    <div class="controlarCantidad d-flex flex-column justify-content-between flex-lg-row">
                      <button class="snes-button botonDeCantidad mx-4 mx-md-2">####Agregar####</button>
                      <button class="snes-button botonDeCantidad mx-4 mx-md-2">####Eliminar####</button>
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
    contenedorProductos.innerHTML += `
      <div class="card mb-3 divDeProducto snes-container my-3" style="max-width: 100%;">
        <div class="row g-0">
          <div class="col-md-4 bg-dark d-flex justify-content-center align-items-center divImagenProducto">
            <img src="${producto.imagen}" class="imgProducto img-fluid" alt="${producto.nombre}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div class="d-flex nombreYCantidad justify-content-between flex-column flex-lg-row">
                <h5>${producto.nombre}</h5>
                <h5>Cantidad: ${producto.cantidad}</h5>
              </div>
              <div class="precioYMoneda my-2">
                <h5>${producto.moneda} ${producto.precio}</h5>
              </div>
              <div class="bottomDiv d-flex justify-content-between mt-2 mt-md-5 flex-column flex-md-row">
                <div class="subtotal">
                  <h5>Subtotal: ${producto.precio * producto.cantidad}</h5>
                </div>
                <div class="controlarCantidad d-flex flex-column justify-content-between flex-lg-row">
                  <button class="snes-button botonDeCantidad mx-4 mx-md-2">Agregar</button>
                  <button class="snes-button botonDeCantidad mx-4 mx-md-2">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}