class Api {
  constructor(baseUrl, token, authUrl) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._authUrl = authUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
       return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  setUserInfo(info) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
      })
    .then(this._checkResponse)
  }

  postCard({name, link}) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, link: link})
    })
    .then(this._checkResponse)
  }

  deleteCard(card) {
    this._cardId = card._id;
    return fetch(`${this._baseUrl}cards/${this._cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(card, isLiked) {
    this._cardId = card._id;
    return fetch(`${this._baseUrl}cards/likes/${this._cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse)
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({avatar})
      })
    .then(this._checkResponse)
  }

  login(email, password) {
    return fetch(`${this._authUrl}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"password": password, "email": email})
    })
    .then(this._checkResponse)
  }

  register(email, password) {
    return fetch(`${this._authUrl}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"password": password, "email": email})
    })
    .then(this._checkResponse)
  }

  checkToken(token) {
    return fetch(`${this._authUrl}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
    })
    .then(this._checkResponse)
  }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-24/', '0c664d7d-5920-42ff-9591-f94b8c7db340', 'https://auth.nomoreparties.co/')
export default api;
