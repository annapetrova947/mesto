const buttonForEditProfile = document.querySelector('.profile__edit-button');
const buttonForAddCard = document.querySelector('.profile__add-button');
const buttonForEditAvatar = document.querySelector('.profile__avatar-container');

const inputName = document.querySelector('.form__input_type_name');
const inputAbout = document.querySelector('.form__input_type_about');
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
const modalToEditAvatar = document.querySelector('.modal_type_edit_avatar')

export {
    buttonForEditProfile,
    buttonForAddCard,
    inputName,
    inputAbout,
    selectors,
    modalToAddCard,
    modalToEditProfile,
    modalToEditAvatar,
    buttonForEditAvatar
}