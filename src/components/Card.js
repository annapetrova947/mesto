import {popupToDelete, api} from "../pages/index.js";

class Card {

    constructor(data, tamplateSelector, selectors,  currentUserId, handleCardClick) {
        this._cardName = data.name;
        this._cardUrl = data.link;
        this._likes = data.likes;

        this._id = data._id
        this.data = data
        this._tamplateSelector = tamplateSelector;
        this._element = this._getElementFromTemplate()
        this._elementPhoto = this._element.querySelector('.element__photo');
        this._elementLike = this._element.querySelector('.element__like-amount');
        this._handleCardClick = handleCardClick;

        this._isOwner = (data.owner._id === currentUserId)
        this._currentUserId = currentUserId
        this._cardDeleteSelector = selectors.trashButtonSelector;
        this._likeClassList = this._element.querySelector('.element__like').classList
        this._deleteCard = this._deleteCard.bind(this);
        this._likeCard = this._likeCard.bind(this);
    }

    isLiked(){
        let flag = false
        //console.log(this._likes)
        this._likes.forEach((like)=> {
            if (like._id === this._currentUserId) {flag = true}
        })
        return flag
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
        popupToDelete.open(this._id, this._element)
        //this._element.remove();
    }

    _likeCard() {
        if (this.isLiked()) {
            this._deleteLike()
        }

        else {
            this._putLike()

        }

    }
    _deleteLike (){
        api.deleteLike(this._id).then(r => {
            this._likes = r.likes
            this._elementLike.textContent = r.likes.length;
            this._likeClassList.remove('element__like_active');

        });
    }

    _putLike(){
        api.likeCard(this._id).then(r => {
            this._likes = r.likes
            this._elementLike.textContent = r.likes.length;
            this._likeClassList.add('element__like_active');
        });
    }

    getElement() {

        this._element.querySelector('.element__title').textContent = this._cardName;
        if (!this._isOwner) {
            this._element.querySelector(this._cardDeleteSelector).style.display = "none";
        }
        if (this.isLiked()) {
            this._likeClassList.add('element__like_active');
        }
        this._elementPhoto.src = this._cardUrl;
        this._elementPhoto.alt = this._cardName;
        this._elementLike.textContent = this._likes.length
        //console.log(this._likes)
        this._addEventListeners();
        return this._element;
    }
}

export default Card;