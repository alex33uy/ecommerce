const button_reg = document.getElementById("btn_reg");
const login_name = document.getElementById("login-name");
const login_pass = document.getElementById("login-pass");

function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
}

const validation = function () {
  if (login_name.value.length > 0 && login_pass.value.length > 0) {
    console.log(login_name.value);
    return "ok";
  } else {
    return "error";
  }
};

// boton para logearse
button_reg.addEventListener("click", function () {
  if (validation() === "ok") {
    location.href = "home.html";
    localStorage.setItem("usuario", login_name.value);
  } else if (validation() === "error") {
    showAlertError();
  }
});

// funcion Logear con Google

function onSuccess(googleUser) {
  console.log(googleUser);
}

function onFailure(error) {
  console.log(error);
}

function renderButton() {
  gapi.signin2.render("my-signing2", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
}

//   159000001934-tqta5bkpl21uug19f84dj6kaobcvuvvl.apps.googleusercontent.com
