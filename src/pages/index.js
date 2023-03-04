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
    initialCards,
    selectors,
    modalToAddCard,
    modalToEditProfile
} from '../utils/constants.js';
import './index.css';

const popupToAddCard = new PopupWithForm({popupSelector: '.modal_type_add', formSubmit:(inputsData)=>
    {
        const cardElement = createCard(inputsData, '.element_template');
        cardList.setItem(cardElement)
            popupToAddCard.close();

        }});

const popupToEditProfile = new PopupWithForm({popupSelector: '.modal_type_edit', formSubmit:(inputsData)=>
    {
        userInfo.setUserInfo(inputsData);
        popupToEditProfile.close();
    }});


buttonForAddCard.addEventListener('click', ()=>{
    validatorFormToAddCard.enableSubmitButton()
    popupToAddCard.open()
})
buttonForEditProfile.addEventListener('click', ()=>{

    const values = userInfo.getUserInfo()
    inputName.value = values.name;
    inputAbout.value = values.about;
    popupToEditProfile.open()
})
popupToAddCard.setEventListeners();
popupToEditProfile.setEventListeners()

const userInfo = new UserInfo('.profile__name', '.profile__about')
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {

        const cardElement = createCard(item, '.element_template');
        cardList.setItem(cardElement);
    }
}, '.elements')


cardList.renderItems()
const validatorFormToAddCard = new FormValidator(selectors, modalToAddCard)
validatorFormToAddCard.enableValidation()

const validatorFormToEditProfile = new FormValidator(selectors, modalToEditProfile)
validatorFormToEditProfile.enableValidation()