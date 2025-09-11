const idDeProducto = localStorage.getItem('productoSeleccionado');
const apiURL = "https://japceibal.github.io/emercado-api/products/" + idDeProducto + ".json";
const carouselInner = document.querySelector('.carousel-inner');
const productContainer = document.getElementById('producto');
const productInfo = document.getElementById('productInfo');

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
    const images = product.images;
    if(images.length >= 4){
        imagen1.src = images[0];
        imagen2.src = images[1];
        imagen3.src = images[2];
        imagen4.src = images[3];
    }

    document.getElementById('productName').textContent = product.name;
    document.getElementById('productCategory').textContent = product.category;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productSold').textContent = `${product.soldCount} vendidos`;
    document.getElementById('productPrice').textContent = `${product.currency} ${product.cost}`;
   })
   .catch(error => {
       console.error(error);
       document.body.innerHTML = '<p>Error al cargar el producto.</p>';
   });