let modalForEditProfile = document.querySelector('.modal_type_edit');
let modalForAddCard = document.querySelector('.modal_type_add');
let modalForPhoto = document.querySelector('.modal_type_photo');
let buttonForEditProfile = document.querySelector('.profile__edit-button');
let buttonForAddCard = document.querySelector('.profile__add-button');
let spanToCloseEditModal = document.querySelector('.modal__close_edit');
let spanToCloseAddModal = document.querySelector('.modal__close_add');
let spanToClosePhotoModal = document.querySelectorAll('.modal__close_photo');

//Навешиваем слушатели на все крестики для фото
spanToClosePhotoModal.forEach(item => {
    item.addEventListener('click', function () {

        modalForPhoto.classList.toggle('modal_show');

    })
})

//Кнопка для открытия попапа добавления карточки
buttonForAddCard.addEventListener('click', function () {
    modalForAddCard.classList.toggle('modal_show');

})

//Кнопка для открытия попапа редактирования профиля
buttonForEditProfile.addEventListener('click', function (){

    modalForEditProfile.classList.toggle('modal_show');
    inputName.value = name.textContent;
    inputAbout.value = about.textContent;

})


//Для закрытия попапа редактирования профиля
spanToCloseEditModal.onclick = function() {
    modalForEditProfile.classList.toggle('modal_show');

}

//Для закрытия попапа добавления карточки
spanToCloseAddModal.onclick = function() {

    modalForAddCard.classList.toggle('modal_show');
}



let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

let inputName = document.querySelector('.form__input_type_name');
let inputAbout = document.querySelector('.form__input_type_about');

let submitEditProfileForm = document.querySelector('.form_edit');

//Сабмит формы редактирования профиля
submitEditProfileForm.addEventListener('submit', function (event){

    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    event.preventDefault();
    modalForEditProfile.classList.toggle('modal_show');

})

//Сабмит формы добавлния карточки
let submitAddCardForm = document.querySelector('.form_add');

submitAddCardForm.addEventListener('submit', function (event) {
    let inputPlaceName = document.querySelector('.form__input_type_placename');
    let inputLink = document.querySelector('.form__input_type_link');
    event.preventDefault();
    let item = {};
    item.name = inputPlaceName.value;
    item.link = inputLink.value;
    renderElement(item);
    modalForAddCard.classList.toggle('modal_show');
    event.target.reset();


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

const elementTemplate = document.querySelector('.element_template');
const container = document.querySelector('.elements');

//клонирование шаблона и заполнение данными
const getElement = (name, link) => {
    const cardElement = elementTemplate.content.cloneNode(true).children[0];
    const nameElement = cardElement.querySelector('.element__title');
    nameElement.textContent = name;
    const linkElement = cardElement.querySelector('.element__photo');
    linkElement.src = link;

    return cardElement;
}


//Навешиваем слушатель на элемент
const setEventListeners = (el) => {

    const photo = el.querySelector('.element__photo');
    photo.addEventListener('click', function (event){
        let placeName = el.querySelector('.element__title');

        modalForPhoto.classList.toggle('modal_show');

        let modalPhotoLink = modalForPhoto.querySelector('.modal__photo');
        let modalPhotoTitle = modalForPhoto.querySelector('.modal__title');

        modalPhotoLink.src = photo.src;
        modalPhotoTitle.textContent = placeName.textContent;

    });

    const like = el.querySelector('.element__like');
    like.addEventListener('click', function (event){
        like.classList.toggle('element__like_active');
    });

    const deleteItem = el.querySelector('.element__delete');
    deleteItem.addEventListener('click', function (event){
        const target = event.target;
        const currentItem = target.closest('.element');
        currentItem.remove();
    });


}
//получение элемента и добавление в контейнер
const renderElement = (item) => {
    const el = getElement(item.name, item.link);
    setEventListeners(el);
    container.prepend(el);


}

//отрисовка всех элементов из массива
initialCards.forEach(renderElement);






