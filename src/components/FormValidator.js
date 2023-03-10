export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._submitButton = form.querySelector(this._config.submitButtonSelector)
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
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

    disableSubmitButton() {
        this._submitButton.setAttribute("disabled", true);
        this._submitButton.classList.add(this._config.inactiveButtonClass);
    }

    _toggleButtonState(inputList) {
        const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);

        if (hasInvalidInput) {
            this.disableSubmitButton();
        } else {
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
        }
    }

    _setEventListenersToInputs() {

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList);
            })
        })
    }

    enableValidation() {
        this._setEventListenersToInputs();
    }
}
