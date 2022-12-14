let productId = localStorage.getItem("productID");
let product_main_container = document.querySelector("#product_main_container");
let conj_prod_add_cart = [];

let URL_COMMENTS = PRODUCT_INFO_COMMENTS_URL + productId + EXT_TYPE;
let URL_INFO_PROD_DETAILED = PRODUCT_INFO_URL + productId + EXT_TYPE;

document.addEventListener("DOMContentLoaded", function (e) {
  loadProdInfo();
  loadComments();
});

function loadProdInfo() {
  getJSONData(URL_INFO_PROD_DETAILED).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let product_detailed = resultObj.data;

      showDetailedProduct(product_detailed);
      addRelatedProd(product_detailed);
    }
  });
}

function loadComments() {
  getJSONData(URL_COMMENTS).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let comentarios = resultObj.data;

      showComments(comentarios);
    }
  });
}

// FUNCION PRODUCTO EN DETALLE
function showDetailedProduct(prod) {
  let { cost, currency, category, soldCount, name, description, images, id } =
    prod;
  product_main_container.innerHTML += `
    <br>
      <h2 id="title">${name}</h2>
    <button class="btn btn-primary btn-large btn-block" id="buy-btn" onclick="addToCart(${id})">Comprar</button>
      <hr>
    <h4><strong>Precio<strong></h4>
      <h4>${currency} ${cost}</h4>
    <br>
      <h4><strong>Descripción<strong></h4>
      <h4> ${description} </h4>
    <br>
      <h4><strong>Categoría<strong></h4>
      <h4>${category}</h4>
    <br>
      <h4><strong>Cantidad de vendidos<strong></h4>
      <h4>${soldCount}</h4>
    <br>
      <h4><strong>Imagenes Ilustrativas<strong></h4>
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner" id="img_div">
          </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
  const div_img = document.getElementById("img_div");
  for (let i = 0; i < images.length; i++) {
    div_img.innerHTML += `
      <div class="carousel-item" data-bs-interval="2000" id="carrousel">
        <img src="${images[i]}" class="d-block w-100">
      </div>
       `;
  }
  const carousel_item = document.getElementsByClassName("carousel-item");
  carousel_item[0].classList.add("active");
  const carousel_item_active = document.getElementsByClassName("active");
  carousel_item_active[0].setAttribute("data-bs-interval", "2000");
}

// FUNCION COMENTARIO Y ESTRELLAS
const comments = document.querySelector("#comments");

function showComments(commentss) {
  for (let comment of commentss) {
    let { user, dateTime, description } = comment;
    comments.innerHTML += `
        <div  class="list-group-item list-group-item-action" id="div_comment" >
        <div class="row">
            <div class="col-0">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1" >
                    <h5> <strong> ${user} </strong>  ${dateTime}</h5> 
                    <p class="text-muted">  ${description}</p> 
                    </div>
                    <div class="rate"> 
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span> 
                    </div> 
                    </div>
                </div>
            </div>
        </div>
        `;
  }
  let starRate = document.getElementsByClassName("rate");
  for (let i = 0; i < starRate.length; i++) {
    for (let j = 0; j < starRate[i].children.length; j++)
      if (j < commentss[i].score) {
        starRate[i].children[j].classList.add("checked");
      }
  }
}

// PRODUCTOS RELACIONADOS
let related = document.getElementById("relatedProd");

function addRelatedProd(prod) {
  for (let relatedProduct of prod.relatedProducts) {
    let { name, id, image } = relatedProduct;
    related.innerHTML += `
        <div class="card"  onclick="setProductId(${id})">
           <img src="${image}" class="card-img-top" >
          <div class="card-body">
           <h5 class="card-title" id="related-title"> ${name}</h5>
          </div>
        </div>
         `;
  }
}

function setProductId(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

// DESAFIATE: AÑADIR COMENTARIO
let new_comment = document.getElementById("area_comment");
const boton_add_comment = document.getElementById("btn_reg_add");
let comments_adedd_container = document.getElementById("comments_added");
const user_commenting = localStorage.getItem("usuario");
let rate_comment_added = document.getElementById("select_score");

function addComment() {
  let date = new Date();
  let actual_date = date.getFullYear();
  let months = date.getMonth();
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (new_comment.value.length > 0) {
    comments_adedd_container.innerHTML += `
    <div  class="list-group-item list-group-item-action"  >
    <div class="row">
        <div class="col-0">
           </div>
              <div class="col">
                <div class="d-flex w-100 justify-content-between">
                  <div class="mb-1" >
                    <h5> <strong> ${user_commenting} </strong>  ${actual_date}-${months}-${day}  ${hours}:${minutes}:${seconds} </h5> 
                    <p class="text-muted">  ${new_comment.value}</p> 
                  </div>
                  <div class="stars-rate"> 
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span> 
                  </div> 
                </div>
            </div>
        </div>
    </div>
    `;
  }
  let starRate = document.getElementsByClassName("stars-rate");
  for (let i = 0; i < starRate.length; i++) {
    for (let j = 0; j < starRate[i].children.length; j++) {
      if (j < rate_comment_added.value) {
        starRate[i].children[j].classList.add("checked");
      }
    }
  }
}

boton_add_comment.addEventListener("click", function () {
  addComment();
});

// DESAFIATE AGREGAR PRODUCTO AL CARRITO
let button_buy = document.getElementById("btn-buy");

function addToCart(id) {
  let conj_prod_add_cart =
    JSON.parse(localStorage.getItem("productAddToCart")) || [];
  conj_prod_add_cart.push(id);
  let arrayProdsInCart = JSON.stringify(conj_prod_add_cart);
  localStorage.setItem("productAddToCart", arrayProdsInCart);
  console.log(conj_prod_add_cart);
}
