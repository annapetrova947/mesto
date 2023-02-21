import {showImagePopup} from "./utils.js";

class Card {

    constructor(data, tamplate_selector) {
        this._card_name = data.name;
        this._card_url = data.link;
        this._tamplate_selector = tamplate_selector;

        this._deleteCard = this._deleteCard.bind(this);
        this._likeCard = this._likeCard.bind(this);
    }

    _getElementFromTemplate(){
        return document.querySelector(this._tamplate_selector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }


    _addEventListeners() {
        this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard);
        this._element.querySelector('.element__like').addEventListener('click', this._likeCard);

        this._element.querySelector('.element__photo').addEventListener('click', ()=>showImagePopup(document.querySelector('.modal_type_photo'), this._element))

    }


    _deleteCard() {
        this._element.remove();
    }

    _likeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }


    getElement(){
        this._element = this._getElementFromTemplate()

        this._element.querySelector('.element__title').textContent = this._card_name;
        this._element.querySelector('.element__photo').src = this._card_url;
        this._element.querySelector('.element__photo').alt = this._card_name;
        this._addEventListeners();
        return this._element;
    }

}

export default Card;