const button_reg = document.getElementById('btn_reg');
const login_name = document.getElementById('login-name');
const login_pass = document.getElementById('login-pass');

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

const validation = function(){
    if(login_name.value.length > 0 && login_pass.value.length > 0 ){
        console.log(login_name.value)
        return "ok";
    
    } else {
        return "error";
    }
}

// boton para logearse
button_reg.addEventListener('click', function(){
    if(validation()=== 'ok') {
        // location.assign("https://alex33uy.github.io/ecommerce/home"); hice cambio por algo mas efectivo;
        location.href = "home.html";
        localStorage.setItem("usuario", login_name.value);
    } else if (validation()==='error'){
        showAlertError();
    }
})

// funcion Logear con Google

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); 
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    
    let id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }