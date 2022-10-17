const CART_USER = CART_INFO_URL + "25801" + EXT_TYPE;



document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_USER).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let cart_of_user = resultObj.data
      addCart(cart_of_user);
    }
  });
  let products_in_Cart = JSON.parse(localStorage.getItem("productAddToCart"));
  const Cart_Products = new Set(products_in_Cart);
  let resultCart_Prodcuts = [...Cart_Products];
  productsAddedtoCart(resultCart_Prodcuts);
});

let cart_20851 = document.getElementById("cart_20851");


function addCart(cart_of_user) {

  let articles_bought = cart_of_user.articles[0];

  cart_20851.innerHTML += `
        <div class="card mb-4">
          <div class="card-body p-4">

            <div class="row align-items-center">
              <div class="col-md-2">
                <img src="${articles_bought.image}"
                  class="img-fluid" alt="image">
              </div>
              <div class="col-md-2 d-flex justify-content-center">
                <div>
                  <p class="small text-muted mb-4 pb-2">Nombre</p>
                  <p class="lead fw-normal mb-0">${articles_bought.name}</p>
                </div>
              </div>
              <div class="col-md-2 d-flex justify-content-center">
                <div>
                  <p class="small text-muted mb-4 pb-2">Cantidad</p>
                  <input id="input_count" type="number" class="form-control">
                </div>
              </div>
              <div class="col-md-2 d-flex justify-content-center">
                <div>
                  <p class="small text-muted mb-4 pb-2">Moneda</p>
                  <p class="lead fw-normal mb-0">${articles_bought.currency}</p>
                </div>
              </div>
              <div class="col-md-2 d-flex justify-content-center">
                <div>
                  <p class="small text-muted mb-4 pb-2">Precio</p>
                  <p class="lead fw-normal mb-0">${articles_bought.unitCost}</p>
                </div>
              </div>
              <div class="col-md-2 d-flex justify-content-center">
                <div id="subtotal_div">
                <p class="small text-muted mb-4 pb-2">Subtotal</p>
                <p class="lead fw-normal mb-0" id="subtotal_p">0</p>
                </div>
              </div>
            </div>

          </div>
        </div>
    `
  let subtotal = document.getElementById("subtotal_p");
  let input_count = document.getElementById("input_count");
  input_count.addEventListener("keyup", (event) => {
    let input_count_value = event.composedPath();
    let calc_subtotal = input_count_value[0].value * articles_bought.unitCost;
    subtotal.innerHTML = `${articles_bought.currency} ${calc_subtotal}`
  })

}

// DESAFIATE ENTREGA 5

function data(url, container_prod_add_cart) {
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let cartProduct = resultObj.data;
            container_prod_add_cart.innerHTML +=
      
              `<div class="card mb-4">
      <div class="card-body p-4">
      
        <div class="row align-items-center">
          <div class="col-md-2">
            <img src="${cartProduct.images[0]}"
              class="img-fluid" alt="image">
          </div>
          <div class="col-md-2 d-flex justify-content-center">
            <div>
              <p class="small text-muted mb-4 pb-2">Nombre</p>
              <p class="lead fw-normal mb-0">${cartProduct.name}</p>
            </div>
          </div>
          <div class="col-md-2 d-flex justify-content-center">
            <div>
              <p class="small text-muted mb-4 pb-2">Cantidad</p>
              <input class="form-control input_count_des" id="input_${cartProduct.name}" type="number">
            </div>
          </div>
          <div class="col-md-2 d-flex justify-content-center">
            <div>
              <p class="small text-muted mb-4 pb-2">Moneda</p>
              <p class="lead fw-normal mb-0">${cartProduct.currency}</p>
            </div>
          </div>
          <div class="col-md-2 d-flex justify-content-center">
            <div>
              <p class="small text-muted mb-4 pb-2">Precio</p>
              <p class="lead fw-normal mb-0 cost" id="cost_of${cartProduct.name}">${cartProduct.cost}</p>
            </div>
          </div>
          <div class="col-md-2 d-flex justify-content-center">
            <div id="subtotal_div">
            <p class="small text-muted mb-4 pb-2">Subtotal</p>
            <p class="lead fw-normal mb-0 subtotall" id="subtotal_of${cartProduct.name}">0</p>
            </div>
          </div>
        </div>
      
      </div>
      </div>`
        
      let input_des = document.getElementById("input_"+cartProduct.name);
         console.log(input_des)
         input_des.addEventListener("keyup", function() {
        const sub = document.getElementById("subtotal_of"+cartProduct.name);
         const cost = document.getElementById("cost_of"+cartProduct.name);
         const input_des = document.getElementById("input_"+cartProduct.name);
           let subtotal = input_des.value * cartProduct.cost
           sub.innerHTML = `${cartProduct.currency} ${subtotal}`
         })       
    }
  })
}
       
      function productsAddedtoCart(resultCart_Prodcuts) {
      let container_prod_add_cart = document.getElementById("products_cart");
      for (let a = 0; a < resultCart_Prodcuts.length; a++) {
        let id = resultCart_Prodcuts[a];
        let URL_INFO_PROD_DETAILED = PRODUCT_INFO_URL + id + EXT_TYPE;
        data(URL_INFO_PROD_DETAILED, container_prod_add_cart); 
      }
    }

