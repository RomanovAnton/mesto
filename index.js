const openPopupButton = document.querySelector('.profile__edit-Button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__button-close');

let profileName = document.querySelector('.popup__user-name')
let profileJob = document.querySelector('.popup__user-job')

function openPopup() {
  popup.classList.add('popup_opened')
  profileJob.value = document.querySelector('.profile__job').textContent;
  profileName.value = document.querySelector('.profile__name').textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);


let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__user-name')
let jobInput = document.querySelector('.popup__user-job')

function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector('.profile__job').textContent = jobInput.value;
  document.querySelector('.profile__name').textContent = nameInput.value;
  closePopup()
}

formElement.addEventListener('submit', formSubmitHandler); 
