const openPopupButton = document.querySelector('.profile__edit-Button');
const closePopupButton = document.querySelector('.popup__button-close');
const popup = document.querySelector('.popup');
let PopupNameInput = document.querySelector('.popup__profile-name');
let PopupJobInput = document.querySelector('.popup__profile-job');
let ProfileName = document.querySelector('.profile__name');
let ProfileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');

function openPopup() {
  popup.classList.add('popup_opened')
  PopupNameInput.value = ProfileName.textContent;
  PopupJobInput.value = ProfileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  ProfileName.textContent = PopupNameInput.value;
  ProfileJob.textContent = PopupJobInput.value;
  closePopup()
}

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 
