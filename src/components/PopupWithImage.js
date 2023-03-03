import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    open(element){

        super.open()

        const modalForPhoto = document.querySelector('.modal_type_photo');

        const modalPhotoLink = modalForPhoto.querySelector('.modal__photo');
        const modalPhotoTitle = modalForPhoto.querySelector('.modal__title');
        //const photo = element.querySelector('.element__photo');
        modalPhotoLink.src = element._card_url;
        modalPhotoLink.alt = element._card_name;
        modalPhotoTitle.textContent = element._card_name;
    }




}