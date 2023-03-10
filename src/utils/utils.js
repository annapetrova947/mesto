import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";

function createCard(item, selector) {
    const card = new Card(item, selector, (cardName, cardUrl)=>{
        cardPopup.open(cardName, cardUrl);
    })
    return card.getElement();
}
const cardPopup = new PopupWithImage('.modal_type_photo');
cardPopup.setEventListeners()

export {createCard}