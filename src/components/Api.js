export class Api {
  constructor(options) {
    this._options = options
  }

  getProfile() {
    return fetch(
      `${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: this._options.headers.authorization,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }

  getCards() {
    return fetch(
      `${this._options.baseUrl}/cards`, {
      headers: {
        authorization: this._options.headers.authorization,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }

  editProfile(data) {
    return fetch(
      `${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._options.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }

  addCard(data) {
    return fetch(
      `${this._options.baseUrl}/cards `, {
      method: 'POST',
      headers: {
        authorization: this._options.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }

  deleteCard(cardId) {
    return fetch(
      `${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._options.headers.authorization,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }

  addLike(cardId) {
    return fetch(
      `${this._options.baseUrl}/cards/${cardId}/likes `, {
      method: 'PUT',
      headers: {
        authorization: this._options.headers.authorization,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }

  deleteLike(cardId) {
    return fetch(
      `${this._options.baseUrl}/cards/${cardId}/likes `, {
      method: 'DELETE',
      headers: {
        authorization: this._options.headers.authorization,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }

  changeAvatar(avatarLink) {
    return fetch(
      `${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._options.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }
}


