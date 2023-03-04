import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{

    constructor(popupSelector) {
        super(popupSelector);
        this._modalPhotoLink = this._popup.querySelector('.modal__photo');
        this._modalPhotoTitle = this._popup.querySelector('.modal__title');

    }

    open(_cardName, _cardUrl){

        super.open()
        this._modalPhotoLink.src = _cardUrl;
        this._modalPhotoLink.alt = _cardName;
        this._modalPhotoTitle.textContent = _cardName;
    }

}