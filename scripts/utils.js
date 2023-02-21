function closePopup(popup) {
    popup.classList.remove('modal_show');
    //слушатель esc
    document.removeEventListener('keydown', closePopupByEsc);

}

function clickOverlay (evt) {

    if(evt.target.classList.contains('modal')){
        closePopup(evt.target);
    }
}

//функция закрытия попапа при нажатии esc
function closePopupByEsc(evt) {
    if(evt.key === 'Escape'){
        const popup = document.querySelector('.modal_show');
        closePopup(popup);
    }
}

function showPopup(popup) {
    popup.classList.add('modal_show');
    //слушатель esc
    document.addEventListener('keydown', closePopupByEsc);

}

const modalForPhoto = document.querySelector('.modal_type_photo');
const modalPhotoLink = modalForPhoto.querySelector('.modal__photo');
const modalPhotoTitle = modalForPhoto.querySelector('.modal__title');

function showImagePopup(popup, element) {
    showPopup(popup);
    const photo = element.querySelector('.element__photo');
    modalPhotoLink.src = photo.src;
    modalPhotoLink.alt = photo.alt;
    modalPhotoTitle.textContent = photo.alt;
}

export { clickOverlay, closePopup, closePopupByEsc, showPopup, showImagePopup}
