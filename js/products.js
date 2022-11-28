const prod_container = document.getElementById("container-products");
const prod_container_title = document.getElementById(
  "container-products-title"
);
const prod_container_product_list = document.getElementById(
  "container-product-list"
);
const btn_desc = document.getElementById("sortDescCost");
const btn_asc = document.getElementById("sortAscCost");
const btn_sold_count = document.getElementById("sortBySoldCount");
let div_item = document.querySelector("#div_product");

const DESC_BY_COST_ORDER = "09";
const ASC_BY_COST_ORDER = "90";
const ORDER_BY_SOLD_COUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, productsArray) {
  let result = [];
  if (criteria === ASC_BY_COST_ORDER) {
    result = productsArray.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === DESC_BY_COST_ORDER) {
    result = productsArray.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_SOLD_COUNT) {
    result = productsArray.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function setProductId(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

function showProductsTitle(titulo) {
  prod_container_title.innerHTML += `<div class="text-center p-4">
  <h2>Productos</h2>
   <p class="lead"> Veras aquí todos los productos de la categoria ${titulo.catName}</p>
  <div>`;
}

// DESAFIATE BUSCADOR
;

function showProductsList(productsArray) {
  console.log(productsArray);
  let htmlContentToAppend = "";
  for (let i = 0; i < productsArray.length; i++) {
    let product = productsArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(product.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(product.cost) <= maxCount))
    ) {
      htmlContentToAppend += `
                       <div  onclick="setProductId(${product.id})" class="list-group-item list-group-item-action  cursor-active" id="div_product"  cursor="active">
                       <div class="row">
                           <div class="col-3">
                               <img src="${product.image}" alt="product image" class="img-thumbnail">
                           </div>
                           <div class="col">
                               <div class="d-flex w-100 justify-content-between">
                                   <div class="mb-1">
                                   <h4> ${product.name} - ${product.currency} ${product.cost}</h4> 
                                   <p>  ${product.description}</p> 
                                   </div>
                                   <small class="text-muted">  ${product.soldCount} vendidos</small> 
                               </div>
                           </div>
                       </div>
                   </div>
                       `;
    }
  }

  prod_container_product_list.innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  showProductsList(currentProductsArray);
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(PRODUCTS_URL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("Fetch Error");
      }
    })
    .then((data) => {
      showProductsTitle(data);
    });
});

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data.products;
      currentProductsArray = productsArray;
      showProductsList(productsArray);
    }
  });

  btn_desc.addEventListener("click", function () {
    sortAndShowProducts(ASC_BY_COST_ORDER, productsArray);
  });

  btn_asc.addEventListener("click", function () {
    sortAndShowProducts(DESC_BY_COST_ORDER, productsArray);
  });

  btn_sold_count.addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_SOLD_COUNT, productsArray);
  });

  search_for.addEventListener("input", function () {
    let dataFiltrado = nameSearch(currentProductsArray);
    prod_container_product_list.innerHTML = "";
    showProductsList(dataFiltrado);
  });


  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showProductsList(productsArray);
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showProductsList(productsArray);
    });
});

let search_for = document.getElementById("search_for")
function nameSearch(array) {
  let search_for = document.getElementById("search_for").value;
  let result = array;
  if (search_for) {
      result = array.filter((product) => product.name.toLowerCase().indexOf(search_for.toLowerCase()) > -1);
  }
  return result;
}
