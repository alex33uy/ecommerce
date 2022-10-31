const CART_USER = CART_INFO_URL + "25801" + EXT_TYPE;
let sumSubtotal = 0;
let sendCost = 0;
let articles_bought = [];

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_USER).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let cart_of_user = resultObj.data;
      let articles = cart_of_user.articles[0];
      const { id, image, name, currency, unitCost, count } = articles;
      document.getElementById("cart_20851").innerHTML = articleToHtml(
        id,
        image,
        name,
        currency,
        unitCost,
        count
      );
    }
  });
  let products_in_Cart = JSON.parse(localStorage.getItem("productAddToCart"));
  const Cart_Products = new Set(products_in_Cart);
  let resultCart_Prodcuts = [...Cart_Products];
  productsAddedtoCart(resultCart_Prodcuts);
  choosenOptAndTotal();
  
});



let costOptions = document.querySelectorAll("input[name='option']");
  let choosenOptAndTotal = () => {
    let selected = document.querySelector("input[name='option']:checked").value;
     // multiplica por subtotal devolviendo por porcentaje
    console.log(selected)
    sub2.innerHTML = `USD ${(calculateSubtotal()).toFixed(2)}`
    let costEnvValue = Number(calculateSubtotal() * selected).toFixed(2);
    cost_env.innerHTML = `USD ${costEnvValue}`;
    total = (Number(calculateSubtotal()) + Number(costEnvValue)).toFixed(2)
    total_final.innerHTML = `USD ${total}`;
  };
  costOptions.forEach((costt) => {
    costt.addEventListener("click", choosenOptAndTotal);
  });

function articleToHtml(id, image, name, currency, unitCost, count) {
  articles_bought.push({
    id: id,
    name: image,
    count: count,
    unitCost: unitCost,
    currency: currency,
    image: image,
  });

  let htmlToAppend = `
  <div class="card mb-0">
  <div class="card-body p-4">
    <div class="row align-items-center">
      <div class="col-md-2">
        <img src="${image}"
        class="img-fluid" alt="image">
      </div>
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p class="small text-muted mb-4 pb-2">Nombre</p>
          <p class="lead fw-normal mb-0">${name}</p>
        </div>
      </div>
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p class="small text-muted mb-4 pb-2">Cantidad</p>
          <input class="form-control input_count_des" id="input_${id}" type="number" oninput="subtotal(${unitCost}, this.value , ${id}, '${currency}')" value="1" min="1">
        </div>
      </div>
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p class="small text-muted mb-4 pb-2">Moneda</p>
          <p class="lead fw-normal mb-0" currency>${currency}</p>
        </div>
      </div>
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p class="small text-muted mb-4 pb-2">Precio</p>
          <p class="lead fw-normal mb-0 unitCost" id="cost_of${id}">${unitCost}</p>
        </div>
      </div>
      <div class="col-md-2 d-flex justify-content-center">
        <div id="subtotal_div">
          <p class="small text-muted mb-4 pb-2">Subtotal</p>
          <p class="lead fw-normal mb-0 subtotall" id="subtotal_of_${id}" onchange="calculateSubtotal()">${currency} ${unitCost}</p>
        </div>
      </div>
    </div>
    <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p></p>
          <button id="delete_from_cart" onclick=""><i class="fas fa-trash"></i></button>
        </div>
    </div>
  
  </div>
  </div>
    `;
  return htmlToAppend;
}

// DESAFIATE ENTREGA 5

function data(url, container_prod_add_cart) {
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let cartProduct = resultObj.data;
      const { id, images, name, currency, cost } = cartProduct;
      container_prod_add_cart.innerHTML += articleToHtml(
        id,
        images[0],
        name,
        currency,
        cost,
        1
      );
    }
  });
}

function productsAddedtoCart(resultCart_Prodcuts) {
  let container_prod_add_cart = document.getElementById("products_cart");
  for (let a = 0; a < resultCart_Prodcuts.length; a++) {
    let id = resultCart_Prodcuts[a];
    let URL_INFO_PROD_DETAILED = PRODUCT_INFO_URL + id + EXT_TYPE;
    data(URL_INFO_PROD_DETAILED, container_prod_add_cart);
  }
}

///////// BOTONES CON VALORES Y OPCIONES

function subtotal(cost, units, id, currency) {
  let subtotaldiv = document.getElementById("subtotal_of_" + id);
  subtotaldiv.innerHTML = `${currency} ${cost * units}`;
}

// Determina valor de opciones elegidas en cuanto a costo.

// FUNCION SUMA DE TOTALES

let sub2 = document.getElementById("subtotal_2"); // suma de subtotales contenedor
let cost_env = document.getElementById("cost_env"); // costos de envio multiplicacion del valor de la opcion por subtotal general
let total_final = document.getElementById("total"); // total, suma de costos de envio y subtotal
let subtotales = document.getElementsByClassName("subtotall");

function calculateSubtotal() {
  let cont = 0;
  for (let f = 0; f < subtotales.length; f++) {
    let subIndiv = Number(subtotales[f].innerHTML.split(" ").splice(1, 1)[0]);
    let currency = subtotales[f].innerHTML.split(" ").splice(0, 1)[0];

    if (currency === "UYU") {
      cont += parseFloat((subIndiv / 40).toFixed(2));
    } else {
      cont += parseFloat(subIndiv.toFixed(2));
    }
  }
  sumSubtotal = cont;
  return sumSubtotal;
};

// // CHEQUEAR SI LOS INPUTS ESTAN DEBIDAMENTE COMPLETADOS

("use strict");
const forms = document.querySelectorAll(".needs-validation");

Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    (event) => {
      if (!credit_card_opt.checked && !bank_transfer_opt.checked) {
        setCustomMessage.innerHTML = "Debe elegir una opcion de pago";
        setCustomMessage.setAttribute("style", "color: red;");
      }
      if (form.checkValidity()) {
        return showAlertSuccess();
      }
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    },
    false
  );
});

function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
}

// inputs modal
const account_number = document.getElementById("account_number");
const card_number = document.getElementById("card_number");
const expiration = document.getElementById("expiration");
const security_code = document.getElementById("security_code");
let setCustomMessage = document.getElementById("set");
let payment = document.getElementById("payment");
let selectPay = document.getElementById("selectPay");
// botones de radio modal
const credit_card_opt = document.getElementById("credit_card_opt");
const bank_transfer_opt = document.getElementById("bank_transfer_opt");

// FUNCION PARA DETERMINAR QUE PASA CON LA ELECCION DENTRO DEL MODAL
function optionSelected() {
  if (bank_transfer_opt.checked) {
    account_number.disabled = false;
    card_number.required = false;
    expiration.required = false;
    security_code.required = false;
    card_number.disabled = true;
    expiration.disabled = true;
    security_code.disabled = true;
    account_number.required = true;
    setCustomMessage.innerHTML = "";
    payment.innerHTML = "Transferencia Bancaria";
    setCustomMessage.setAttribute("style", "color: red;");
  } else if (credit_card_opt.checked) {
    card_number.disabled = false;
    expiration.disabled = false;
    security_code.disabled = false;
    account_number.required = false;
    account_number.disabled = true;
    card_number.required = true;
    expiration.required = true;
    security_code.required = true;
    setCustomMessage.innerHTML = "";
    payment.innerHTML = "Tarjeta de credito";
    setCustomMessage.setAttribute("style", "color: red;");
  }
}
