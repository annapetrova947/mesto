export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        this._popup.classList.add('modal_show');
        //слушатель esc
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this._popup.classList.remove('modal_show');
        //слушатель esc
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt){
        if(evt.key === 'Escape'){
            //const popup = document.querySelector('.modal_show');
            this.close();
        }
    }

    setEventListeners(){

        const closeButton = this._popup.querySelector('.modal__close')

        closeButton.addEventListener('click', ()=>this.close())
        this._popup.addEventListener('click', (evt)=>{
            if(evt.target.classList.contains('modal')){
                this.close(evt.target);
            }
        })

    }
}