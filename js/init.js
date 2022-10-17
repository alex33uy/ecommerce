const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
// const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products"; // modificado para sea json categoria autos
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";







// Mostrando usuario logueado

const navuser = document.getElementsByClassName("nav-item");
let user = localStorage.getItem("usuario");
const usuario = navuser[3]

document.addEventListener("DOMContentLoaded", function(){
    if(user !== null) {
    usuario.innerHTML = 
    `  
    <div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    ${user} 
  </a>
 <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li> <a class="dropdown-item" href="cart.html"> Mi carrito</a></li>
    <li> <a class="dropdown-item" href="my-profile.html"> Mi Perfil </a></li>
    <li> <a class="dropdown-item   role="button"> Cerrar sesión </a></li>
  </ul>
</div>
  `
  const ips = document.getElementsByClassName("dropdown-item")[2];
  ips.setAttribute("id", "close")

  const cerrar_sesion = document.getElementById("close");
  
  cerrar_sesion?.addEventListener("click", (evt) => {
    localStorage.removeItem("usuario");
    location.href = "index.html";
    localStorage.removeItem("productAddToCart");
  })
    }
 
})





// localstorage para obtener id y mostrar productos segun categorias

const catID = localStorage.getItem('catID');
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"+catID+EXT_TYPE; // url modificada para que determine productos dependiendo categorias




let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
const cerrar_sesion = document.getElementById("close");

cerrar_sesion?.addEventListener("click", (evt) => {
  preventDefault();
  localStorage.removeItem("usuario");
  location.href = "index.html";
})