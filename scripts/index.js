const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditButtonClose = document.querySelector('.popup__edit-button-close');
const popupAddButtonClose = document.querySelector('.popup__add-button-close');
const popupImageButtonClose = document.querySelector('.popup__image-button-close');

const editPopup = document.querySelector('.popup_edit-profile');
const addPopup = document.querySelector('.popup_add-card');
const imagePopup = document.querySelector('.popup_image');


let popupEditNameInput = document.querySelector('.popup__profile-name');
let popupEditJobInput = document.querySelector('.popup__profile-job');
let popupAddCardName = document.querySelector('.popup__card-name');
let popupAddCardLink = document.querySelector('.popup__card-link');


let editform = document.querySelector('.popup__edit-form');
let addform = document.querySelector('.popup__add-form');

let ProfileName = document.querySelector('.profile__name');
let ProfileJob = document.querySelector('.profile__job');



function openEditPopup() {
  editPopup.classList.add('popup_opened')
  popupEditNameInput.value = ProfileName.textContent;
  popupEditJobInput.value = ProfileJob.textContent;
}

function closeEditPopup() {
  editPopup.classList.remove('popup_opened')
}

function openAddPopup() {
  addPopup.classList.add('popup_opened')
}

function closeAddPopup() {
  addPopup.classList.remove('popup_opened')
}



function editFormSubmitHandler(evt) {
  evt.preventDefault();
  ProfileName.textContent = popupEditNameInput.value;
  ProfileJob.textContent = popupEditJobInput.value;
  closeEditPopup()
}


editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

popupEditButtonClose.addEventListener('click', closeEditPopup);
popupAddButtonClose.addEventListener('click', closeAddPopup);
popupImageButtonClose.addEventListener('click', closeImagePopup);

editform.addEventListener('submit', editFormSubmitHandler);
addform.addEventListener('submit', addFormSubmitHandler);

// ----------------------------------------------------------------


// 1. Добавление карточек
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.cards__template').content;
const cardTitle = document.querySelector('.cards__title')


function render() {
  initialCards.forEach(renderCard);
}

function renderCard(initialCards) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.cards__title').textContent = initialCards.name;
  card.querySelector('.cards__image').src = initialCards.link;
  card.querySelector('.cards__image').alt = initialCards.name;
  card.querySelector('.cards__like').addEventListener('click', activeLike);
  card.querySelector('.cards__basket').addEventListener('click', deleteCard);
  card.querySelector('.cards__image').addEventListener('click', openImagePopup);
  cardsList.appendChild(card);
}
render();

function renderNewCard() {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.cards__title').textContent = popupAddCardName.value;
  card.querySelector('.cards__image').src = popupAddCardLink.value;
  card.querySelector('.cards__image').alt = popupAddCardName.value;
  card.querySelector('.cards__like').addEventListener('click', activeLike);
  card.querySelector('.cards__basket').addEventListener('click', deleteCard);
  card.querySelector('.cards__image').addEventListener('click', openImagePopup);
  cardsList.prepend(card);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  renderNewCard(popupAddCardName, popupAddCardLink)
  closeAddPopup()
}

function activeLike(event) {
  event.target.classList.toggle('cards__like_active');
}

function deleteCard(event) {
  event.target.closest('.cards__item').remove();
}

function openImagePopup(event) {
  imagePopup.classList.add('popup_opened')
  document.querySelector('.popup__card-image').src = event.target.src;
  document.querySelector('.popup__caption').textContent = event.target.alt;
}


function closeImagePopup() {
  imagePopup.classList.remove('popup_opened')
}

