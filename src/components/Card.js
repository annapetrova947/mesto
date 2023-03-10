
class Card {

    constructor(data, tamplateSelector, handleCardClick) {
        this._cardName = data.name;
        this._cardUrl = data.link;
        this._tamplateSelector = tamplateSelector;
        this._element = this._getElementFromTemplate()
        this._elementPhoto = this._element.querySelector('.element__photo');
        this._handleCardClick = handleCardClick;

        this._deleteCard = this._deleteCard.bind(this);
        this._likeCard = this._likeCard.bind(this);
    }


    _getElementFromTemplate() {
        return document.querySelector(this._tamplateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _addEventListeners() {
        this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard);
        this._element.querySelector('.element__like').addEventListener('click', this._likeCard);

        this._elementPhoto.addEventListener('click', () => {

            this._handleCardClick(this._cardName, this._cardUrl)})
    }

    _deleteCard() {
        this._element.remove();
    }

    _likeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    getElement() {

        this._element.querySelector('.element__title').textContent = this._cardName;
        this._elementPhoto.src = this._cardUrl;
        this._elementPhoto.alt = this._cardName;
        this._addEventListeners();
        return this._element;
    }
}

export default Card;