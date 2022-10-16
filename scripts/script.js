let modal = document.querySelector('.modal');
let btn = document.querySelector('.profile__edit-button');
let span = document.querySelector('.modal__close');


btn.addEventListener('click', function (){
    modal.style.display = "flex";
    inputName.value = name.textContent;
    inputAbout.value = about.textContent;

})

span.onclick = function() {
    modal.style.display = "none";
}

let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

let inputName = document.querySelector('.form__input_type_name');
let inputAbout = document.querySelector('.form__input_type_about');

let submit = document.querySelector('.form');

submit.addEventListener('submit', function (event){

    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    event.preventDefault();
    modal.style.display = "none";

})




