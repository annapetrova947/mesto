import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {createCard} from "../utils/utils.js";
import {
    buttonForEditProfile,
    buttonForAddCard,
    inputName,
    inputAbout,
    selectors,
    modalToAddCard,
    modalToEditProfile,
    modalToEditAvatar,
    buttonForEditAvatar
} from '../utils/constants.js';
import './index.css';
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete";

function changeButtonText(popup, text){
    const submitButton = popup.querySelector('.form__submit-button')
    submitButton.textContent = text
}

const popupToAddCard = new PopupWithForm({popupSelector: '.modal_type_add', formSubmit:(inputsData)=>
    {
        changeButtonText(modalToAddCard, 'Создание...')
        api.createCard(inputsData)
            .then((item)=> {
            const cardElement = createCard(item, '.element_template');
            cardList.setItem(cardElement)
            popupToAddCard.close();
            changeButtonText(modalToAddCard, 'Сохранить')
        })
            .catch((err)=>{console.log(err)})
        }}
)

const popupToEditProfile = new PopupWithForm({popupSelector: '.modal_type_edit', formSubmit:(inputsData)=>
    {
        changeButtonText(modalToEditProfile, 'Сохранение...')
        api.saveProfileInfo(inputsData)
            .then((data)=>{
                userInfo.setUserInfo(data);
                popupToEditProfile.close();
                changeButtonText(modalToEditProfile, 'Сохранить')
            })
            .catch((err)=>{console.log(err)})

    }});

const popupToEditAvatar = new PopupWithForm({popupSelector: '.modal_type_edit_avatar', formSubmit:(inputsData)=>
    {
        changeButtonText(modalToEditAvatar, 'Сохранение...')
        api.saveAvatar(inputsData)
            .then((data)=>{
                api.getProfileInformation().then(
                    (res)=>{
                        userInfo.setUserInfo(res)
                    }
                )
                    .catch((err)=>{console.log(err)})
                popupToEditAvatar.close();
                changeButtonText(modalToEditProfile, 'Сохранить')
            })
            .catch((err)=>{console.log(err)})

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

const popupToDelete = new PopupDelete({popupSelector: '.modal_type_delete', formSubmit:()=>
    {
        api.deleteCard(popupToDelete.getCardId())
            .then(()=>{
                popupToDelete.getElement().remove();
                popupToDelete.close();

            })
            .catch((err)=>{console.log(err)})

    }});
popupToDelete.setEventListeners()
export {popupToDelete}

let userId;
export {userId}
Promise.all([
    api.getCards(),
    api.getCurrentUser(),
    api.getProfileInformation()
])
    .then(([items, user, userInformation])=>{
        userId = user._id;
        cardList.renderItems(items.reverse())
        userInfo.setUserInfo(userInformation)
    })
    .catch((err)=>{console.log(err)})
export {api};

const validatorFormToAddCard = new FormValidator(selectors, modalToAddCard)
validatorFormToAddCard.enableValidation()

const validatorFormToEditProfile = new FormValidator(selectors, modalToEditProfile)
validatorFormToEditProfile.enableValidation()

const validatorFormToEditAvatar = new FormValidator(selectors, modalToEditAvatar)
validatorFormToEditAvatar.enableValidation()