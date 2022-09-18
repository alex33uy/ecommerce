let productId = localStorage.getItem("productID");
let product_main_container = document.querySelector("#product_main_container");

let URL_COMMENTS =  PRODUCT_INFO_COMMENTS_URL + productId + EXT_TYPE;
let URL_INFO_PROD_DETAILED = PRODUCT_INFO_URL + productId + EXT_TYPE;


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_INFO_PROD_DETAILED).then(function(resultObj){
        if (resultObj.status === "ok"){
        let product_detailed = resultObj.data;
          
        showDetailedProduct(product_detailed);
        }
    });
})
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_COMMENTS).then(function(resultObj){
        if (resultObj.status === "ok"){
        let comentarios = resultObj.data;
         
        showComments(comentarios)
        }
    });
})

// FUNCION PRODUCTO EN DETALLE
function showDetailedProduct(prod){  
    product_main_container.innerHTML += 
    `
    <br>
    <h2>${prod.name}</h2>
    <hr>
    <h4><strong>Precio<strong></h4>
    <h4>${prod.currency} ${prod.cost}</h4>
    <br>
    <h4><strong>Descripción<strong></h4>
    <h4> ${prod.description} </h4>
    <br>
    <h4><strong>Categoría<strong></h4>
    <h4>${prod.category}</h4>
    <br>
    <h4><strong>Cantidad de vendidos<strong></h4>
    <h4>${prod.soldCount}</h4>
    <br>
    <h4><strong>Imagenes Ilustrativas<strong></h4>
    <div class="d-flex" id ="img_div">
    </div>
    <br>
    <br>
    `
const div_img = document.getElementById("img_div")
    for(let i=0; i < prod.images.length; i++){
       div_img.innerHTML += `
       <div class="img-prod-container">
       <img src=${prod.images[i]}>
       </div>
       `
    }
}

// FUNCION COMENTARIO Y ESTRELLAS
const comments = document.querySelector("#comments");

function showComments(commentss) {
    for(let comment of commentss){
        comments.innerHTML += `
        <div  class="list-group-item list-group-item-action" id="div_comment" >
        <div class="row">
            <div class="col-0">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1" >
                    <h5> <strong> ${comment.user} </strong>  ${comment.dateTime}</h5> 
                    <p class="text-muted">  ${comment.description}</p> 
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
        `
}
let starRate = document.getElementsByClassName("rate")
    for (let i = 0; i < starRate.length; i++) {
        for (let j = 0; j < starRate[i].children.length; j++) 
            if (j < commentss[i].score) {
                starRate[i].children[j].classList.add("checked")
            }  
    }
}

//  FUNCION PARA CENTRAR Y AGRANDAR IMAGEN AL CLICKEAR NO CONCLUIDA
// document.querySelectorAll(".img-prod-container img").forEach(e=>{
//     e.addEventListener("click", function(ev) {
//         ev.stopPropagation();
//         this.parentnode.classList.add("active");
//     })
// });

// document.querySelectorAll(".img-prod-container").forEach(e=>{
//     e.addEventListener("click", function(ev) {
//         this.classList.remove("active");
//     })
// });



// DESAFIATE: AÑADIR COMENTARIO
