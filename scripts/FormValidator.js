export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
    }

    _checkInputValidity(inputElement) {
        const isValid = inputElement.validity.valid;

        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        if (isValid) {
            this._hideInputError(inputElement, errorElement);
        } else {
            this._showInputError(inputElement, errorElement);
        }
    }

    _showInputError(inputElement, errorElement) {
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.classList.add(this._config.errorClass);
    }

    _hideInputError(inputElement, errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorClass);
        inputElement.classList.remove(this._config.inputErrorClass);
    }

    enableSubmitButton(submitButton) {

        submitButton.setAttribute("disabled", true);
        submitButton.classList.add(this._config.inactiveButtonClass);
    }

    _toggleButtonState(inputList) {
        const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
        const submitButton = this._form.querySelector(this._config.submitButtonSelector)

        if (hasInvalidInput) {
            this.enableSubmitButton(submitButton, this._config.inactiveButtonClass);

        } else {

            submitButton.removeAttribute('disabled');
            submitButton.classList.remove(this._config.inactiveButtonClass);
        }
    }

    _setEventListenersToInputs() {

        const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList);
            })
        })
    }

    enableValidation() {

        const formList = document.querySelectorAll(this._config.formSelector);

        formList.forEach(formElement => {
            this._setEventListenersToInputs();
        })
    }

}











