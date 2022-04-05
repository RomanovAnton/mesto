export class Card {
  constructor({ data, templateSelector, handleCardClick, handleDeleteCard, userId }) {
    this._cardSelector = templateSelector;
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data.cardId;
    this._userId = userId;
    this.handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.cards__image')
    this._cardTitile = this._element.querySelector('.cards__title')
    this._cardLike = this._element.querySelector('.cards__like')
    this._cardBasket = this._element.querySelector('.cards__basket')
    this._cardLikes = this._element.querySelector('.cards__counter-likes')
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true)
    return cardElement
  }

  _toggleLike(event) {
    event.target.classList.toggle('cards__like_active');

    console.log(this._likes)
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitile.textContent = this._title;

    this._cardLikes.textContent = this._likes.length;
    if (this._userId !== this._ownerId) {
      this._cardBasket.style.display = 'none'
    }
    this._setEventListeners()
    return this._element;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', (evt) => { this._toggleLike(evt) })
    this._cardBasket.addEventListener('click', () => { this.handleDeleteCard(this._cardId) })
    this._cardImage.addEventListener('click', () => { this.handleCardClick() })
  }



}
