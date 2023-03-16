import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor({popupSelector, formSubmit}) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector('.form');

    }

    open(cardId, element) {
        super.open();
        this._cardId = cardId;
        this._element = element;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._formSubmit();
        });
    }

    getCardId() {
        return this._cardId;
    }

    getElement(){
        return this._element
    }
}