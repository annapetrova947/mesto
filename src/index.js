import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import {createCard} from "./utils/utils.js";
import {
    buttonForEditProfile,
    buttonForAddCard,
    name,
    about,
    inputName,
    inputAbout,
    initialCards,
    selectors,
    modalToAddCard,
    modalToEditProfile
} from './utils/constants.js';
import './pages/index.css';

const formToAddCard = new PopupWithForm({popupSelector: '.modal_type_add', formSubmit:(inputData)=>
    {
        const newCard = new Section({
            items: [inputData],
            renderer: (inputData) => {

                const cardElement = createCard(inputData, '.element_template');
                newCard.setItem(cardElement);
            }
        }, '.elements');

            newCard.renderItems();
            formToAddCard.close();
            validatorFormToAddCard.enableSubmitButton()
        }});

const formToEditProfile = new PopupWithForm({popupSelector: '.modal_type_edit', formSubmit:(inputData)=>
    {
        userInfo.setUserInfo(inputData);
        formToEditProfile.close();
    }});


buttonForAddCard.addEventListener('click', ()=>{
    formToAddCard.open()
})
buttonForEditProfile.addEventListener('click', ()=>{

    const values = userInfo.getUserInfo()
    inputName.value = values.name;
    inputAbout.value = values.about;
    formToEditProfile.open()
})
formToAddCard.setEventListeners();
formToEditProfile.setEventListeners()

const userInfo = new UserInfo(name, about)
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