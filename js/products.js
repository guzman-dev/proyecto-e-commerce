// -----------------------------------------------------------------------------
//PREPARACIONES

//Se guarda el nodo del contenedor principal para agregarle cada casilla de productos al final
const contenedorDeListaConProductos = document.getElementById("contenedorProductos");

//Checkea si el usuario NO está logeado, y si no lo está, lo manda a la pagina de login.
function checkLogin(){
    if(sessionStorage.getItem("loggedIn") == null || sessionStorage.getItem("loggedIn") === "false"){
        window.location.href = "login.html";
    }}

//Se añade un eventlistener para que se ejecute la funcion que carga la lista de productos al finalizar la carga de la página
document.addEventListener("DOMContentLoaded", cargarProductos);

checkLogin();

//Función que se utilizará para cargar y agregar los productos a la página.
async function cargarProductos(){

    // -----------------------------------------------------------------------------
    //PREPARACION DE DATOS
    
    // Se realiza el fetch para conseguir los datos de los productos de la categoria autos
    let response = await fetch("https://japceibal.github.io/emercado-api/cats_products/101.json");
    // Se convierte la respuesto en un objeto json
    let data = await response.json();
    // Se guarda el arreglo de productos en una variable
    let productos = data.products;

    // -----------------------------------------------------------------------------
    //PROCESO DE AGREGAR LOS PRODUCTOS A LA PÁGINA

    // Se crea un for loop para realizar la creación de la casilla para cada elemento del arreglo
    for (let i = 0; i < productos.length; i++) {
        // Se toma del arreglo el producto actual en el loop y se guarda en una variable
        let productoActual = productos[i];

        // -----------------------------------------------------------------------------
        // SE CREAN LOS ELEMENTOS QUE FORMARAN PARTE DE LA CASILLA DEL ELEMENTO ACTUAL

        //Casilla del producto actual, tipo div
        let divDeProductoActual = document.createElement("div");

        //Imagen del producto, tipo img
        let imagenDeProducto = document.createElement("img");

        //Nombre del producto, tipo h2
        let nombreDeProducto = document.createElement("h2");

        //Precio, tipo h2
        let precioDeProducto = document.createElement("h2");

        //Descripción del producto, tipo p
        let descripcionDeProducto = document.createElement("p");

        //Cantidad de vendidos, tipo h2
        let cantidadVendidos = document.createElement("h2");

        //Botón para añadir al carrito
        let botonCarrito = document.createElement("button");

        //Div que contendrá el botón para añadir al carrito
        let divComprar = document.createElement("div");

        //Div que contendrá los elementos nombre, precio, y cantidad vendidos del producto
        let divTop = document.createElement("div");

        //Div que contendrá los elementos descipción de producto y div del botón para añadir al carrito
        let divBottom = document.createElement("div");
      
        //Div que contendrá los elementos nombre de producto y precio de producto
        let divLeftTop = document.createElement("div");

        //Div que contendrá el divTop y divBottom
      
        let divGeneral = document.createElement("div");

        //Imagen que irá en el botón
        let imagenCarrito = document.createElement("img");
        imagenCarrito.src = 'img/Carrito de compra.png';

        // -----------------------------------------------------------------------------
        //ASIGNACIÓN DE CLASES A ELEMENTOS, ESTOS SERAN UTILIZADOS EN EL CSS PARA DARLE ESTILO A LA LISTA DE PRODUCTOS

        //Divs
        divDeProductoActual.classList.add("casillaProducto");
        divGeneral.classList.add("general");
        divTop.classList.add("topRow");
        divBottom.classList.add("bottomRow");
        divLeftTop.classList.add("leftTop");
        divGeneral.classList.add("general");

        botonCarrito.classList.add("botonCarrito");

        divComprar.appendChild(botonCarrito);
        divComprar.classList.add("comprarBotonP");

        //Elementos con info del producto
        imagenDeProducto.classList.add("imagenP");
        nombreDeProducto.classList.add("nombreP");
        precioDeProducto.classList.add("precioP");
        descripcionDeProducto.classList.add("descripcionP");
        cantidadVendidos.classList.add("cantidadVendidosP");

        //Boton del carrito y su imágen
        imagenCarrito.classList.add("carroImg");
        botonCarrito.classList.add("botonCarrito");

        // -----------------------------------------------------------------------------
        //ASIGNACIÓN DE VALOR A LAS VARIABLES CON LA INFO DEL PRODUCTO ACTUAL

        //Imagen
        imagenDeProducto.src = productoActual.image; 

        //Nombre
        nombreDeProducto.innerHTML = productoActual.name;

        //Precio, se concatena la moneda en la que se vende con el precio del producto
        precioDeProducto.innerHTML = productoActual.currency + " " + productoActual.cost;

        //Descripción
        descripcionDeProducto.innerHTML = productoActual.description;
        descripcionDeProducto.classList.add("descripcionP");
        
        //Cantidad de vendidos
        cantidadVendidos.innerHTML = productoActual.soldCount + " " + "Vendidos";
        
        // -----------------------------------------------------------------------------
        //PONIENDO ELEMENTOS DENTRO DE LOS DIVS PRINCIPALES

        botonCarrito.appendChild(imagenCarrito);
        divTop.appendChild(divLeftTop);
      
        //divTop (nombre, precio, cantidad vendidos)
        divTop.appendChild(nombreDeProducto);
        divTop.appendChild(precioDeProducto);
        divTop.appendChild(cantidadVendidos);

        //divBottom (descripción y div con el boton del carrito)
        divBottom.appendChild(descripcionDeProducto);
        divBottom.appendChild(divComprar);
        
        //divLeftTop (nombre y precio)
        divLeftTop.appendChild(nombreDeProducto);
        divLeftTop.appendChild(precioDeProducto);

        //div del boton (boton para comprar)
        divComprar.appendChild(botonCarrito);

        //se le agrega la imagen del carrito al boton, el url de la imagen es asignado en el css con su clase
        botonCarrito.appendChild(imagenCarrito);
        
        //Se agregan los 2 divs con información del producto a un contenedor para facilitar la modificación en css
        divGeneral.appendChild(divTop);
        divGeneral.appendChild(divBottom);
        
        //Se agregan la imagen del producto, así como el div con la info en la casilla del producto actual

        divDeProductoActual.appendChild(imagenDeProducto);
        divDeProductoActual.appendChild(divGeneral);

        //Finalmente, se agrega la casilla al contenedor principal de la página para que sea visualizado
        contenedorDeListaConProductos.appendChild(divDeProductoActual);
        
        //FIN DE LA ITERACIÓN ACTUAL, ESTÓ SE REPETIRÁ CON CADA PREDUCTO EN EL ARREGLO HASTA QUE SE LLEGUÉ AL FINAL
    }
}
