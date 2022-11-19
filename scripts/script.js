const modalForEditProfile = document.querySelector('.modal_type_edit');
const modalForAddCard = document.querySelector('.modal_type_add');
const modalForPhoto = document.querySelector('.modal_type_photo');
const buttonForEditProfile = document.querySelector('.profile__edit-button');
const buttonForAddCard = document.querySelector('.profile__add-button');
const formToAddCard = document.querySelector('.form_add');
const inputPlaceName = document.querySelector('.form__input_type_placename');
const inputLink = document.querySelector('.form__input_type_link');
const elementTemplate = document.querySelector('.element_template');
const container = document.querySelector('.elements');
const modalPhotoLink = modalForPhoto.querySelector('.modal__photo');
const modalPhotoTitle = modalForPhoto.querySelector('.modal__title');

//Универсальное закрытие всех попапов
const buttonsToClosePopups = document.querySelectorAll('.modal__close');
buttonsToClosePopups.forEach((button) => {
    // находим 1 раз ближайший к крестику попап
    const popup = button.closest('.modal');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
});


//Закрытие попапа
function closePopup(popup) {
    popup.classList.remove('modal_show');
    //слушатель esc
    document.removeEventListener('keydown', closePopupByEsc);

}

const backgroundModals = document.querySelectorAll('.modal');
backgroundModals.forEach((modal)=>{
    modal.addEventListener('click', clickOverlay)
})

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

//Открытие попапа
function showPopup(popup) {
    popup.classList.add('modal_show');
    //слушатель esc
    document.addEventListener('keydown', closePopupByEsc);
}


//Кнопка для открытия попапа добавления карточки
buttonForAddCard.addEventListener('click', ()=>showPopup(modalForAddCard))

//Кнопка для открытия попапа редактирования профиля
buttonForEditProfile.addEventListener('click', function (){

    showPopup(modalForEditProfile);
    inputName.value = name.textContent;
    inputAbout.value = about.textContent;

})

const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');

const inputName = document.querySelector('.form__input_type_name');
const inputAbout = document.querySelector('.form__input_type_about');

const formToEditProfile = document.querySelector('.form_edit');

//Сабмит формы редактирования профиля
formToEditProfile.addEventListener('submit', function (event){

    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    event.preventDefault();
    closePopup(modalForEditProfile);

})

//Сабмит формы добавлния карточки

formToAddCard.addEventListener('submit', function (event) {

    event.preventDefault();
    const item = {};
    item.name = inputPlaceName.value;
    item.link = inputLink.value;
    renderElement(item);
    closePopup(modalForAddCard);
    event.target.reset();
    const buttonToSubmit = formToAddCard.querySelector('.form__submit-button')
    buttonToSubmit.setAttribute("disabled", true);
    buttonToSubmit.classList.add('form__submit-button_disabled');

})


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



//клонирование шаблона и заполнение данными
const getElement = (name, link) => {
    const cardElement = elementTemplate.content.cloneNode(true);
    const nameElement = cardElement.querySelector('.element__title');
    nameElement.textContent = name;
    const linkElement = cardElement.querySelector('.element__photo');
    linkElement.src = link;
    linkElement.alt = name;
    setEventListeners(cardElement);

    return cardElement;
}


//Навешиваем слушатель на элемент
const setEventListeners = (el) => {

    const photo = el.querySelector('.element__photo');
    photo.addEventListener('click', function (event){
        showPopup(modalForPhoto);
        modalForPhoto.classList.add('modal_show-img');
        modalPhotoLink.src = photo.src;
        modalPhotoLink.alt = photo.alt;
        modalPhotoTitle.textContent = photo.alt;

    });

    const like = el.querySelector('.element__like');
    like.addEventListener('click', function (event){
        like.classList.toggle('element__like_active');
    });

    const itemToDelete = el.querySelector('.element__delete');
    itemToDelete.addEventListener('click', function (event){
        const target = event.target;
        const currentItem = target.closest('.element');
        currentItem.remove();
    });


}
//получение элемента и добавление в контейнер
const renderElement = (item) => {
    const el = getElement(item.name, item.link);
    container.prepend(el);


}

//отрисовка всех элементов из массива
initialCards.forEach(renderElement);


