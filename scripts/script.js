let modal = document.querySelector('.modal');
let btn = document.querySelector(".profile__edit-button");
let span = document.querySelector(".modal__close");


btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

let input_name = document.querySelector('.form__input_name');
let input_about = document.querySelector('.form__input_about');

let submit = document.querySelector('.form__submit-button');

submit.addEventListener('click', function (){

    name.textContent = input_name.value;
    about.textContent = input_about.value;
    event.preventDefault();
    modal.style.display = "none";

})

let edit_profile = document.querySelector('.profile__edit-button');

edit_profile.addEventListener('click', function (){

    input_name.value = name.textContent;
    input_about.value = about.textContent;

})
