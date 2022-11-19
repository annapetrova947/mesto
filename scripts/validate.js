




const checkInputValidity = (inputElement) => {
    const isValid = inputElement.validity.valid;

    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    if(isValid) {
        hideInputError(errorElement, inputElement);
    }
    else {
        showInputError(errorElement, inputElement);
    }
}

const showInputError = (errorElement, inputElement) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add('red');
    errorElement.classList.add('form__input-error_active');
}

const hideInputError = (errorElement, inputElement) => {
    errorElement.textContent = '';
    errorElement.classList.remove('form__input-error_active');
    inputElement.classList.remove('red')
}

const EventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const submitButton = formElement.querySelector('.form__submit-button');

    //toggleButton(inputList, submitButton);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', ()=> {
            checkInputValidity(inputElement);
            toggleButton(inputList, submitButton);
        })
    })
}


const toggleButton = (inputList, buttonElement) => {
    const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);

    if (hasInvalidInput) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add('form__submit-button_disabled');
    }

    else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove('form__submit-button_disabled');
    }
}

function enableValidation(selectors) {
    const formList = document.querySelectorAll(selectors.formSelector);

    formList.forEach(formElement => {
        EventListeners(formElement);
    })
}

const selectors = {
    formSelector: '.modal',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: '.form__submit-button_disabled',
    inputErrorClass: '.red',
    errorClass: '.form__input-error_active'

}

enableValidation(selectors);











