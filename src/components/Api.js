class Api {
  constructor(options) {
    this._options = options
  }

  getProfile() {
    return fetch(
      `${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: '5ad22543-5373-4be4-b3dc-87da6979f027',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  getCards() {
    return fetch(
      `${this._options.baseUrl}/cards`, {
      headers: {
        authorization: '5ad22543-5373-4be4-b3dc-87da6979f027',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  editProfile(data) {
    return fetch(
      `${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: '5ad22543-5373-4be4-b3dc-87da6979f027',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  addCard(data) {
    return fetch(
      `${this._options.baseUrl}/cards `, {
      method: 'POST',
      headers: {
        authorization: '5ad22543-5373-4be4-b3dc-87da6979f027',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  deleteCard(cardId) {
    return fetch(
      `${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '5ad22543-5373-4be4-b3dc-87da6979f027',
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  addLike(cardId) {
    return fetch(
      `${this._options.baseUrl}/cards/${cardId}/likes `, {
      method: 'PUT',
      headers: {
        authorization: '5ad22543-5373-4be4-b3dc-87da6979f027',
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  deleteLike(cardId) {
    return fetch(
      `${this._options.baseUrl}/cards/${cardId}/likes `, {
      method: 'DELETE',
      headers: {
        authorization: '5ad22543-5373-4be4-b3dc-87da6979f027',
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  changeAvatar(avatarLink) {
    return fetch(
      `${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: '5ad22543-5373-4be4-b3dc-87da6979f027',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink,   
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '5ad22543-5373-4be4-b3dc-87da6979f027',
    'Content-Type': 'application/json'
  }
});
