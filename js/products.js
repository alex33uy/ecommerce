const prod_container = document.getElementById("container-products");



function showProducts(productos) {
  console.log(productos)
   prod_container.innerHTML += 
   `<div class="text-center p-4">
   <h2>Productos</h2>
    <p class="lead"> Veras aquí todos los productos de la categoria ${productos.catName}</p>
   <div>`
  for (let producto of productos.products) {
    console.log(producto)
    prod_container.innerHTML +=  
    // <div class="card-product">  
    // ${producto.id} ${producto.name} ${producto.description} ${producto.cost} ${producto.currency} ${producto.soldCount}  ${producto.image}
    // </div>
    `<div class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col-3">
            <img src="${producto.image}" alt="product image" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h4> ${producto.name} - ${producto.currency} ${producto.cost}</h4> 
                <p>  ${producto.description}</p> 
                </div>
                <small class="text-muted">  ${producto.soldCount} vendidos</small> 
            </div>

        </div>
    </div>
</div>`;
  }
  return prod_container;
}


document.addEventListener("DOMContentLoaded", function() {
  fetch(PRODUCTS_URL)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log("Fetch Error");
    }
  })
  .then((data) => {
     showProducts(data);
  });
});

