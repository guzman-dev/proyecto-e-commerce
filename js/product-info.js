const idDeProducto = localStorage.getItem('productoSeleccionado');
const apiURL = "https://japceibal.github.io/emercado-api/products/" + idDeProducto + ".json";
const apiURLComentarios = "https://japceibal.github.io/emercado-api/products_comments/" + idDeProducto + ".json";
const carouselInner = document.querySelector('.carousel-inner');
const productContainer = document.getElementById('producto');
const productInfo = document.getElementById('productInfo');

const botonEnviarCalificacion = document.getElementById("botonEnviarCalificacion")

const calificaciones = document.getElementById("calificaciones");

const imagen1 = document.getElementById("imagen1");
const imagen2 = document.getElementById("imagen2");
const imagen3 = document.getElementById("imagen3");
const imagen4 = document.getElementById("imagen4");

let yaComento = false;

botonEnviarCalificacion.addEventListener("click", enviarCalificacion);

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

let comentarios = [];

fetch (apiURLComentarios)
    .then(response => {
        if(!response.ok) throw new Error ("Error al obtener los comentarios");
        return response.json();
    })
    .then(data => {
        comentarios = data;
        cargarComentarios();
    })
    .catch(error => console.error("Error:", error));

function cargarComentarios(){
    calificaciones.innerHTML = "";
    
    comentarios.forEach(comentario => {
        const divComentario = document.createElement("div");
        divComentario.classList.add("d-flex", "flex-column", "card", "mb-3");
        divComentario.classList.add("card");
        divComentario.style.backgroundColor="rgb(255, 176, 119, 0.9)";

        const divTopComentario = document.createElement("div");
        divTopComentario.classList.add("d-flex","flex-row", "gap-4", "align-items-center");
        divTopComentario.classList.add("card-header");

        const divBottomComentario = document.createElement("div");
        divBottomComentario.id="divBottomComentario";
        divBottomComentario.style.backgroundColor="rgb(255, 133, 58, 0.6)";
        divBottomComentario.classList.add("card-body");

        const nombreUsuario = document.createElement("h5");
        nombreUsuario.textContent = comentario.user;

        const fechaComentario = document.createElement("p");
        fechaComentario.textContent = comentario.dateTime;

        const calificacionProducto = document.createElement("p");

        const comentarioProducto = document.createElement("p");
        comentarioProducto.textContent = comentario.description;

        for (let i = 0; i < 5; i++) {
            if(i < comentario.score){
                calificacionProducto.innerHTML += "<span class='fa fa-star checked'></span>"  
            }else{
                calificacionProducto.innerHTML += "<span class='fa fa-star'></span>"
            }
        }

        divTopComentario.appendChild(nombreUsuario);
        divTopComentario.appendChild(fechaComentario);
        divTopComentario.appendChild(calificacionProducto);

        divBottomComentario.appendChild(comentarioProducto);

        divComentario.appendChild(divTopComentario);
        divComentario.appendChild(divBottomComentario);

        calificaciones.appendChild(divComentario);
    });
}   

function enviarCalificacion(){

        const comentarioParaEnviar = document.getElementById("areaParaComentar");

        if(!comentarioParaEnviar.value){
            comentarioParaEnviar.placeholder = "Es necesario ingresar un comentario para calificar...";
            comentarioParaEnviar.classList.add("flash-error")
            setTimeout(() => {comentarioParaEnviar.classList.remove("flash-error");
            }, 1000);
            return;
        }

        const estrellaSeleccionada = document.querySelector('#estrellasParaCalificar input[name="rating"]:checked');
        calificacion = estrellaSeleccionada ?Number(estrellaSeleccionada.value) : 0;


        if(calificacion === 0){
            const iconosDeEstrellas = document.querySelectorAll('#estrellasParaCalificar label');
            iconosDeEstrellas.forEach(label =>{
                label.classList.add("flash-estrellas-error")
                setTimeout(() => {label.classList.remove("flash-estrellas-error");
            }, 1000);
            })
            return;
        }

        const comentarioNuevo = {
            product: idDeProducto,
            score: calificacion,
            description: comentarioParaEnviar.value,
            user: sessionStorage.getItem("username"),
            dateTime: getFechaFormateada()
        }


        if(yaComento){
            comentarios[0] = comentarioNuevo;
        }else{
            comentarios.unshift(comentarioNuevo);
        }
        yaComento = true;
        cargarComentarios();



}

function getFechaFormateada() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}











