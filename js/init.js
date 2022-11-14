const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL ="https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL ="https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

// Mostrando usuario logueado y redirreccionando a login si no lo esta

const navuser = document.getElementsByClassName("nav-item");
let user = localStorage.getItem("usuario");
const usuario = navuser[3];
const articlesInCart = localStorage.getItem("productAddToCart")
document.addEventListener("DOMContentLoaded", function () {
  if (user !== null) {
    usuario.innerHTML = `  
    <div class="dropdown">
       <a class="btn btn-secondary dropdown-toggle"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        <img id="profile_photo"> ${user} 
       </a>
         <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
           <li> <a class="dropdown-item" href="cart.html"> Mi carrito <i  class="fas fa-shopping-basket"></i></a></li>
           <li> <a class="dropdown-item" href="my-profile.html"> Mi Perfil <i  class="fas fa-user"></i> </a></li>
           <li> <a class="dropdown-item   role="button" onclick="closeSesion()"> Cerrar sesión <i class="fas fa-door-closed"></i></a></li>
         </ul>
    </div>
    `;
    let profile_photo = document.getElementById("profile_photo");
    let current_profile_photo = localStorage.getItem("profile_photo") || "/recursos/marcador-de-foto-avatar-perfil-predeterminado.jpg";
    profile_photo.src = current_profile_photo;
  } else {
    location.href = "index.html";
  } 
});


function closeSesion() {
  localStorage.removeItem("usuario");
  location.href = "index.html";
  localStorage.removeItem("productAddToCart");
}

// localstorage para obtener id y mostrar productos segun categorias

const catID = localStorage.getItem("catID");
const PRODUCTS_URL =
  "https://japceibal.github.io/emercado-api/cats_products/" + catID + EXT_TYPE; // url modificada para que determine productos dependiendo categorias

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

