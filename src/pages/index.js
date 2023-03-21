import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
    buttonForEditProfile,
    buttonForAddCard,
    inputName,
    inputAbout,
    selectors,
    modalToAddCard,
    modalToEditProfile,
    modalToEditAvatar,
    modalToDeleteCard,
    buttonForEditAvatar
} from '../utils/constants.js';
import './index.css';
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete";
import PopupWithImage from "../components/PopupWithImage.js"
import Card from "../components/Card.js";

function changeButtonText(popup, text){
    const submitButton = popup.querySelector('.form__submit-button')
    submitButton.textContent = text
}

const confirmDeleteCard = (card) => {
    popupToDelete.open(card)

}

const handleLikeClick = (card)=>{
    if (card.isLiked()) {
        api.deleteLike(card.id).then(r => {
            card.toggleLike(r)
        })
            .catch((err)=>{console.log(err)});
    }
    else {
        api.likeCard(card.id)
            .then(r => {
            card.toggleLike(r)
        })
            .catch((err)=>{console.log(err)})
    }
}

function createCard(item, selector) {
    const card = new Card(item, selector, selectors,  userId, popupToDelete, (cardName, cardUrl)=>{
        cardPopup.open(cardName, cardUrl);
    }, confirmDeleteCard, handleLikeClick)
    return card.getElement();
}
const cardPopup = new PopupWithImage('.modal_type_photo');
cardPopup.setEventListeners()


const popupToAddCard = new PopupWithForm({popupSelector: '.modal_type_add', formSubmit:(inputsData)=>
    {
        changeButtonText(modalToAddCard, 'Создание...')
        api.createCard(inputsData)
            .then((item)=> {
            const cardElement = createCard(item, '.element_template');
            cardList.setItem(cardElement)
            popupToAddCard.close();

        })
            .catch((err)=>{console.log(err)})
            .finally(()=>{
                changeButtonText(modalToAddCard, 'Сохранить')
            })
        }}
)

const popupToEditProfile = new PopupWithForm({popupSelector: '.modal_type_edit', formSubmit:(inputsData)=>
    {
        changeButtonText(modalToEditProfile, 'Сохранение...')
        api.saveProfileInfo(inputsData)
            .then((data)=>{
                userInfo.setUserInfo(data);
                popupToEditProfile.close();

            })
            .catch((err)=>{console.log(err)})
            .finally(()=>{
                changeButtonText(modalToEditProfile, 'Сохранить')
            })

    }});

const popupToEditAvatar = new PopupWithForm({popupSelector: '.modal_type_edit-avatar', formSubmit:(inputsData)=>
    {
        changeButtonText(modalToEditAvatar, 'Сохранение...')
        api.saveAvatar(inputsData)
            .then((data)=>{
                userInfo.setUserInfo(data)
                popupToEditAvatar.close();

            })
            .catch((err)=>{console.log(err)})
            .finally(()=>{
                changeButtonText(modalToEditAvatar, 'Сохранить')
            })

    }});


buttonForAddCard.addEventListener('click', ()=>{
    validatorFormToAddCard.disableSubmitButton()
    popupToAddCard.open()
})

buttonForEditAvatar.addEventListener('click', ()=>{
    validatorFormToEditAvatar.disableSubmitButton()
    popupToEditAvatar.open()
})

buttonForEditProfile.addEventListener('click', ()=>{

    const values = userInfo.getUserInfo()
    inputName.value = values.name;
    inputAbout.value = values.about;
    popupToEditProfile.open()
})
popupToAddCard.setEventListeners();
popupToEditProfile.setEventListeners()
popupToEditAvatar.setEventListeners()

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar')
const cardList = new Section({
    renderer: (item) => {

        const cardElement = createCard(item, '.element_template');
        cardList.setItem(cardElement);
    }
}, '.elements')

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61/', '8f841aa5-d524-4117-84e2-1be232c9909b');

const popupToDelete = new PopupDelete({popupSelector: '.modal_type_delete', formSubmit:(card)=>
    {
        changeButtonText(modalToDeleteCard, 'Удаление...')
        api.deleteCard(popupToDelete.getCardId())
            .then((data)=>{
                card._deleteCard();
                popupToDelete.close();

            })
            .catch((err)=>{console.log(err)})
            .finally(()=>{
                changeButtonText(modalToDeleteCard, 'Да')
            })

    }});
popupToDelete.setEventListeners()


let userId;

Promise.all([
    api.getCards(),
    api.getProfileInformation()
])
    .then(([items, userInformation])=>{
        userId = userInformation._id;
        cardList.renderItems(items.reverse())
        userInfo.setUserInfo(userInformation)
    })
    .catch((err)=>{console.log(err)})


const validatorFormToAddCard = new FormValidator(selectors, modalToAddCard)
validatorFormToAddCard.enableValidation()

const validatorFormToEditProfile = new FormValidator(selectors, modalToEditProfile)
validatorFormToEditProfile.enableValidation()

const validatorFormToEditAvatar = new FormValidator(selectors, modalToEditAvatar)
validatorFormToEditAvatar.enableValidation()