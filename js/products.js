<<<<<<< Updated upstream
=======
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
        let divTop = document.createElement("div");
        let divBottom = document.createElement("div");
        let divGeneral = document.createElement("div");
        let imagenCarrito = document.createElement("img");
        imagenCarrito.src = '../img/Carrito de compra.png';

        divTop.classList.add("topRow");
        divBottom.classList.add("bottomRow");
        divGeneral.classList.add("general");

        botonCarrito.classList.add("botonCarrito");

        divComprar.appendChild(botonCarrito);
        divComprar.classList.add("comprarBotonP");

        imagenCarrito.classList.add("carroImg");

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

        botonCarrito.appendChild(imagenCarrito);
        divTop.appendChild(nombreDeProducto);
        divTop.appendChild(precioDeProducto);
        divTop.appendChild(cantidadVendidos);

        divBottom.appendChild(descripcionDeProducto);
        divBottom.appendChild(divComprar);

        divComprar.appendChild(botonCarrito);

        divDeProductoActual.appendChild(imagenDeProducto);
        divDeProductoActual.classList.add("casillaProducto");
        divDeProductoActual.appendChild(divGeneral);

        divGeneral.appendChild(divTop);
        divGeneral.appendChild(divBottom);


        divDeProductos.appendChild(divDeProductoActual);
        
    }
}
>>>>>>> Stashed changes
