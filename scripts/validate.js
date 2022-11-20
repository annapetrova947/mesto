const checkInputValidity = (inputElement, selectors) => {
    const isValid = inputElement.validity.valid;

    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    if(isValid) {
        hideInputError(errorElement, inputElement, selectors);
    }
    else {
        showInputError(errorElement, inputElement, selectors);
    }
}

const showInputError = (errorElement, inputElement, selectors) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.classList.add(selectors.errorClass);
}

const hideInputError = (errorElement, inputElement, selectors) => {
    errorElement.textContent = '';
    errorElement.classList.remove(selectors.errorClass);
    inputElement.classList.remove(selectors.inputErrorClass)
}

const setEventListenersToInputs = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const submitButton = formElement.querySelector(selectors.submitButtonSelector);



    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', ()=> {
            checkInputValidity(inputElement, selectors);
            toggleButton(inputList, submitButton, selectors);
        })
    })
}

function makeButtonDisabled(button, classAdd) {

    button.setAttribute("disabled", true);
    button.classList.add(classAdd);
}


const toggleButton = (inputList, buttonElement, selectors) => {
    const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);

    if (hasInvalidInput) {
        makeButtonDisabled(buttonElement, selectors.inactiveButtonClass);

    }

    else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
}

function enableValidation(selectors) {
    const formList = document.querySelectorAll(selectors.formSelector);

    formList.forEach(formElement => {
        setEventListenersToInputs(formElement, selectors);
    })
}

const selectors = {
    formSelector: '.modal',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_error-active',
    errorClass: 'form__input-error_active'

}

enableValidation(selectors);











