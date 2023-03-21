import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor({popupSelector, formSubmit}) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector('.form');

    }

    open(card) {
        super.open();

        this._cardId = card.id;
        this.card = card

    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._formSubmit(this.getCard());
        });
    }

    getCardId() {
        return this._cardId;
    }

    getCard(){
        return this.card;
    }
}