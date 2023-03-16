export default class Api {
    constructor(basePath, token) {
        this._basePath = basePath;
        this._token = token;
    }

    _getHeaders(){
        return {authorization: this._token,
            'Content-Type': 'application/json'}
    }

    _getJSON(res){
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getCards(){
        const promise = fetch(`${this._basePath}cards`, {
            headers: this._getHeaders()
        });
        return promise.then(this._getJSON)
    }

    createCard(item){
        return fetch(`${this._basePath}cards`, {
                method: "POST",
                headers: this._getHeaders(),
                body: JSON.stringify(item),
        })
            .then(this._getJSON);
    }

    getCurrentUser(){
        return fetch(`${this._basePath}users/me`, {
            headers: this._getHeaders()
        }).then(this._getJSON);
    }

    getProfileInformation (){
        return fetch(`${this._basePath}users/me`, {
            headers: this._getHeaders()
        }).then(this._getJSON);
    }

    saveProfileInfo (data) {
        return fetch(`${this._basePath}users/me`, {
            method: "PATCH",
            headers: this._getHeaders(),
            body: JSON.stringify(data),

        })
            .then(this._getJSON);
    }

    deleteCard (id) {
        return fetch(`${this._basePath}cards/${id}`, {
            method: "DELETE",
            headers: this._getHeaders(),
        })
            .then(this._getJSON);
    }

    likeCard(id){
        return fetch(`${this._basePath}cards/${id}/likes`, {
            method: "PUT",
            headers: this._getHeaders(),
        })
            .then(this._getJSON);
    }

    deleteLike(id){
        return fetch(`${this._basePath}cards/${id}/likes`, {
            method: "DELETE",
            headers: this._getHeaders(),
        })
            .then(this._getJSON);
    }

    saveAvatar(data){
        return fetch(`${this._basePath}users/me/avatar`, {
            method: "PATCH",
            headers: this._getHeaders(),
            body: JSON.stringify(data),
        })
            .then(this._getJSON);
    }
}