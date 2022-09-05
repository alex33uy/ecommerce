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
const user = localStorage.getItem("usuario");
document.addEventListener("DOMContentLoaded", function(){
    if(user !== null) {
    navuser[3].innerHTML += 
    `<a class="nav-link " href="#"> ${user} </a>`;
    }
});

// localstorage para obtener id y mostrar productos segun categorias

const catID = localStorage.getItem('catID');
console.log(catID);
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"+catID+".json"; // url modificada para que determine productos dependiendo categorias




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