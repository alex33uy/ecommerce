let store_changes = document.getElementById("store_changes");
let input_email_address = document.getElementById("input_email_address");
let inputLastName = document.getElementById("inputLastName")
let inputFirstName = document.getElementById("inputFirstName")
let inputSecName = document.getElementById("inputSecName")
let inputSecLastName = document.getElementById("inputSecLastName")
let inputPhone = document.getElementById("inputPhone")
let inputBirthday = document.getElementById("inputBirthday")

document.addEventListener("DOMContentLoaded", (evt) => {
    input_email_address.setAttribute("value", user);
    showProfileData()
});

("use strict");
const forms = document.querySelectorAll(".needs-validation");

Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    (event) => {
        if (form.checkValidity()) {
           storageProfileData(inputFirstName.value, inputLastName.value, inputSecName.value, inputSecLastName.value, input_email_address.value, inputPhone.value, inputBirthday.value);
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
// Almacena datos creando un array vacio y empujando los parametros como valor de los elementos del objeto
function storageProfileData(name, lastName, secondName, secondLastName, email, phoneNumber, birthday){
    let conj_profile_data = []
    let user = {"name":name, "lastName":lastName, "secondName":secondName, "secondLastName":secondLastName, "email":email, "phoneNumber":phoneNumber, "birthday":birthday}
    conj_profile_data.push(user);
    let arrayProfileData = JSON.stringify(conj_profile_data)
    localStorage.setItem("userProfile", arrayProfileData);
    JSON.parse(localStorage.getItem("userProfile"));
};
// muestra el local storage guardado
function showProfileData(){
    let profileDataStored = JSON.parse(localStorage.getItem("userProfile"));
    let {name, lastName, secondName, secondLastName, email, phoneNumber, birthday} = profileDataStored[0];
    inputFirstName.setAttribute("value", name);
    inputLastName.setAttribute("value", lastName);
    inputSecName.setAttribute("value", secondName);
    inputSecLastName.setAttribute("value", secondLastName);
    input_email_address.setAttribute("value", email);
    inputPhone.setAttribute("value", phoneNumber);
    inputBirthday.setAttribute("value", birthday);
}

let profileImage = document.getElementById('image');
let btn_save_photo = document.getElementById("save_prof_photo");
let currentProfileImage = document.getElementById("imagen");
currentProfileImage.src = localStorage.getItem("profile_photo") || "/recursos/marcador-de-foto-avatar-perfil-predeterminado.jpg";

profileImage.addEventListener("change", function(){
  const file = new FileReader();
  file.readAsDataURL(profileImage.files[0]);
  file.addEventListener("load", () => {
    const url = file.result;
    console.log(url)
    localStorage.setItem("profile_photo", url)
  })
})

btn_save_photo.addEventListener("click", function() {
let currentProfileImage = document.getElementById("imagen");
const urlImage = localStorage.getItem("profile_photo");
currentProfileImage.src = urlImage;
history.go()
})

