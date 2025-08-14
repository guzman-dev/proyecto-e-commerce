const divDeProductos = document.getElementById("contenedorProductos");
document.addEventListener("DOMContentLoaded", cargarProductos);

async function cargarProductos(){
    let response = await fetch("https://japceibal.github.io/emercado-api/cats_products/101.json");
    let data = await response.json();
    let productos = data.products;
    for (let i = 0; i < productos.length; i++) {
        let productoActual = productos[i];
        let divDeProductoActual = document.createElement("div");
        let imagenDeProducto = document.createElement("img");
        let nombreDeProducto = document.createElement("h2");
        let precioDeProducto = document.createElement("h2");
        let descripcionDeProducto = document.createElement("p");
        let cantidadVendidos = document.createElement("h2");

        imagenDeProducto.src = productoActual.image;
        nombreDeProducto.innerHTML = productoActual.name;
        precioDeProducto.innerHTML = productoActual.currency + " " + productoActual.cost;
        descripcionDeProducto.innerHTML = productoActual.description;
        cantidadVendidos.innerHTML = productoActual.soldCount + " " + "Vendidos";

        divDeProductoActual.appendChild(imagenDeProducto);
        divDeProductoActual.appendChild(nombreDeProducto);
        divDeProductoActual.appendChild(precioDeProducto);
        divDeProductoActual.appendChild(descripcionDeProducto);
        divDeProductoActual.appendChild(cantidadVendidos);
        divDeProductoActual.classList.add("casillaProducto");
        divDeProductos.appendChild(divDeProductoActual);
        
    }
}