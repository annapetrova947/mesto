const buttonForEditProfile = document.querySelector('.profile__edit-button');
const buttonForAddCard = document.querySelector('.profile__add-button');
const buttonForEditAvatar = document.querySelector('.profile__avatar-container');

const inputName = document.querySelector('.form__input_type_name');
const inputAbout = document.querySelector('.form__input_type_about');
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

const selectors = {
    formSelector: '.modal',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_error-active',
    errorClass: 'form__input-error_active',
    trashButtonSelector : '.element__delete'
}

const modalToAddCard = document.querySelector('.modal_type_add')
const modalToEditProfile = document.querySelector('.modal_type_edit')
const modalDelete = document.querySelector('.modal_type_delete')
const modalToEditAvatar = document.querySelector('.modal_type_edit_avatar')

export {
    buttonForEditProfile,
    buttonForAddCard,
    inputName,
    inputAbout,
    initialCards,
    selectors,
    modalToAddCard,
    modalToEditProfile,
    modalDelete,
    modalToEditAvatar,
    buttonForEditAvatar
}