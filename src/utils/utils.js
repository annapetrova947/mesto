import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";

function createCard(item, selector) {
    const card = new Card(item, selector, (element)=>{

        const cardPopup = new PopupWithImage('.modal_type_photo');
        cardPopup.open(card)
        cardPopup.setEventListeners()
    });
    return card.getElement();
}

export {createCard}