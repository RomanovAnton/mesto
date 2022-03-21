

export class Card {
  constructor({data, templateSelector, handleCardClick}) {
    this._cardSelector = templateSelector;
    this._title = data.name;
    this._image = data.link;
    this.handleCardClick = handleCardClick;

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
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.cards__like').addEventListener('click', this._toggleLike)
    this._element.querySelector('.cards__basket').addEventListener('click', () => { this._deleteCard() })
    this._element.querySelector('.cards__image').addEventListener('click', () => {this.handleCardClick()})
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.cards__image').src = this._image;
    this._element.querySelector('.cards__image').alt = this._title;
    this._element.querySelector('.cards__title').textContent = this._title;
    this._setEventListeners()
    return this._element;
  }
}
