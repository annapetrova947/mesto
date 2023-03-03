
class Card {

    constructor(data, tamplate_selector, handleCardClick) {
        this._card_name = data.name;
        this._card_url = data.link;
        this._tamplate_selector = tamplate_selector;
        this._element = this._getElementFromTemplate()
        this._elementPhoto = this._element.querySelector('.element__photo');
        this._handleCardClick = handleCardClick;

        this._deleteCard = this._deleteCard.bind(this);
        this._likeCard = this._likeCard.bind(this);
        //this._handleCardClick = this._handleCardClick.bind(this);
    }


    _getElementFromTemplate() {
        return document.querySelector(this._tamplate_selector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _addEventListeners() {
        this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard);
        this._element.querySelector('.element__like').addEventListener('click', this._likeCard);

        this._elementPhoto.addEventListener('click', () => {

            this._handleCardClick()})
    }

    _deleteCard() {
        this._element.remove();
    }

    _likeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    getElement() {

        this._element.querySelector('.element__title').textContent = this._card_name;
        this._elementPhoto.src = this._card_url;
        this._elementPhoto.alt = this._card_name;
        this._addEventListeners();
        return this._element;
    }
}

export default Card;