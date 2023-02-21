import Card from './Card.js';
import FormValidator from "./FormValidator.js";
import {closePopup, showPopup} from "./utils.js";

const modalForEditProfile = document.querySelector('.modal_type_edit');
const modalForAddCard = document.querySelector('.modal_type_add');
const buttonForEditProfile = document.querySelector('.profile__edit-button');
const buttonForAddCard = document.querySelector('.profile__add-button');
const formToAddCard = document.querySelector('.form_add');
const inputPlaceName = document.querySelector('.form__input_type_placename');
const inputLink = document.querySelector('.form__input_type_link');
const container = document.querySelector('.elements');


//Кнопка для открытия попапа добавления карточки
buttonForAddCard.addEventListener('click', ()=>{
    showPopup(modalForAddCard)
})

// //Кнопка для открытия попапа редактирования профиля
buttonForEditProfile.addEventListener('click', function (){
    showPopup(modalForEditProfile);
    inputName.value = name.textContent;
    inputAbout.value = about.textContent;

})

const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const inputName = document.querySelector('.form__input_type_name');
const inputAbout = document.querySelector('.form__input_type_about');

const formToEditProfile = document.querySelector('.form_edit');

//Сабмит формы редактирования профиля
formToEditProfile.addEventListener('submit', function (event){

    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    event.preventDefault();
    closePopup(modalForEditProfile);

})

//Сабмит формы добавлния карточки

formToAddCard.addEventListener('submit', function (event) {

    event.preventDefault();
    const item = {};
    item.name = inputPlaceName.value;
    item.link = inputLink.value;
    const card = new Card(item, '.element_template');
    const el = card.getElement();
    container.prepend(el);
    closePopup(modalForAddCard);
    event.target.reset();
    const buttonToSubmit = formToAddCard.querySelector('.form__submit-button')
    validatorFormToAddCard.enableSubmitButton(buttonToSubmit)
})


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];




//отрисовка всех элементов из массива
initialCards.forEach(
    (item)=>{
        const card = new Card(item, '.element_template');
        const el = card.getElement();
        container.prepend(el);
    }
)


const selectors = {
    formSelector: '.modal',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_error-active',
    errorClass: 'form__input-error_active'

}

const modalToAddCard = document.querySelector('.modal_type_add')
const validatorFormToAddCard = new FormValidator(selectors, modalToAddCard)
validatorFormToAddCard.enableValidation()



const modalToEditProfile = document.querySelector('.modal_type_edit')
const validatorFormToEditProfile = new FormValidator(selectors, modalToEditProfile)
validatorFormToEditProfile.enableValidation()



