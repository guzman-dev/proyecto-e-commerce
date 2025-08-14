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
        let divComprar = document.createElement("div");
        let botonCarrito = document.createElement("button");

        divComprar.appendChild(botonCarrito);
        divComprar.classList.add("comprarBotonP");
        imagenDeProducto.src = productoActual.image;
        imagenDeProducto.classList.add("imagenP");
        nombreDeProducto.innerHTML = productoActual.name;
        nombreDeProducto.classList.add("nombreP");
        precioDeProducto.innerHTML = productoActual.currency + " " + productoActual.cost;
        precioDeProducto.classList.add("precioP");
        descripcionDeProducto.innerHTML = productoActual.description;
        descripcionDeProducto.classList.add("descripcionP")
        cantidadVendidos.innerHTML = productoActual.soldCount + " " + "Vendidos";
        cantidadVendidos.classList.add("cantidadVendidosP");


        divDeProductoActual.appendChild(imagenDeProducto);
        divDeProductoActual.appendChild(nombreDeProducto);
        divDeProductoActual.appendChild(precioDeProducto);
        divDeProductoActual.appendChild(descripcionDeProducto);
        divDeProductoActual.appendChild(cantidadVendidos);
        divDeProductoActual.classList.add("casillaProducto");
        divDeProductoActual.appendChild(botonCarrito);
        divDeProductos.appendChild(divDeProductoActual);
        
    }
}