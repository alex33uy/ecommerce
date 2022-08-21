const button_reg = document.getElementById('btn_reg');
const login_name = document.getElementById('login-name')
const login_pass = document.getElementById('login-pass')

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


button_reg.addEventListener('click', function(){
    if(validation()=== 'ok') {
        location.assign("https://alex33uy.github.io/ecommerce/home")
    
    } else if (validation()==='error'){
        showAlertError();
    }
})