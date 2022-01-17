const openPopupButton = document.querySelector('.profile__edit-Button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__button-close');

let PopupNameInput = document.querySelector('.popup__profile-name');
let PopupJobInput = document.querySelector('.popup__profile-job');
let formElement = document.querySelector('.popup__form');

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

function openPopup() {
  popup.classList.add('popup_opened')
  PopupNameInput.value = document.querySelector('.profile__name').textContent;
  PopupJobInput.value = document.querySelector('.profile__job').textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector('.profile__job').textContent = PopupJobInput.value;
  document.querySelector('.profile__name').textContent = PopupNameInput.value;
  closePopup()
}

formElement.addEventListener('submit', formSubmitHandler); 
