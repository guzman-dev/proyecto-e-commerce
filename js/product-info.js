const idDeProducto = localStorage.getItem('productoSeleccionado');
const apiURL = "https://japceibal.github.io/emercado-api/products/" + idDeProducto + ".json";
const carouselInner = document.querySelector('.carousel-inner');
const productContainer = document.getElementById('producto');
const productInfo = document.getElementsById('productInfo');

const imagen1 = document.getElementById("imagen1");
const imagen2 = document.getElementById("imagen2");
const imagen3 = document.getElementById("imagen3");
const imagen4 = document.getElementById("imagen4");

fetch(apiURL)
   .then(response => {
    if (!response.ok){
        throw new Error('No encontrado');
    }
    return response.json();
   })
   .then(product => {

    product.images.forEach((url, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('carousel-item');
        if (index === 0){
            itemDiv.classList.add('active');
        }
        itemDiv.innerHTML = `<img src="${url}" class="d-block w-100" alt="Imagen de ${product.name}">`;
        carouselInner.appendChild(itemDiv);
    })
       productInfo.innerHTML = `
           <h2>${product.name}</h2>
           <p>${product.description}</p>
           <p>Categoría: ${product.category}</p>
           <p>Precio: ${product.cost}</p>
           <p>Vendidos: ${product.soldCount}</p>
       `;

       //Si vas a agregar los div desde acá, te comviene borrarlos del html entonces
       //¿Que los cree acá en lugar de llamarlos?
       //Vos en el foreach, está creando un nuevo div con un img dentro, para cada imagen, yo te dije que podias poner los div y img en el html nomás, y lo unico que
       //tenés que asignar acá es el src de cada img, yo ya te dejé las referencia a los img arriba, imagen1,2,3,4...
       //lo unico que tenés que hacer es imagen1.src = images[0] por ejemplo, parece que todos los productos tienen solo 4 imagenes, entonces conviene solo hacerlo en el html
       //después si queres nos juntamos y te explico, detarde/noche
       //Ok, no tengo problema. Si querés ahora pusheamos esto y yo sigo en github después de clase. Si no consigo, te aviso.
       //perfecto, terrible wssp esto, le hago u
       //jaja mejor que discord 
   })
   .catch(error => {
       console.error(error);
       document.body.innerHTML = '<p>Error al cargar el producto.</p>';
   });