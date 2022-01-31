// кнопки страницы
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// кнопки попапа
const popupEditButtonClose = document.querySelector('.popup__edit-button-close');
const popupAddButtonClose = document.querySelector('.popup__add-button-close');
const popupImageButtonClose = document.querySelector('.popup__image-button-close');
// попапы
const editPopup = document.querySelector('.popup_edit-profile');
const addPopup = document.querySelector('.popup_add-card');
const imagePopup = document.querySelector('.popup_image');
// поля попапов
let popupEditNameInput = document.querySelector('.popup__profile-name');
let popupEditJobInput = document.querySelector('.popup__profile-job');
let popupAddCardName = document.querySelector('.popup__card-name');
let popupAddCardLink = document.querySelector('.popup__card-link');
// формы попапов
let editform = document.querySelector('.popup__edit-form');
let addform = document.querySelector('.popup__add-form');
// инфо профиля
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
// карточки
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.cards__template').content;
const cardTitle = document.querySelector('.cards__title')



// открыть/закрыть попап
function openEditPopup() {
  editPopup.classList.add('popup_opened')
  popupEditNameInput.value = profileName.textContent;
  popupEditJobInput.value = profileJob.textContent;
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

function openImagePopup(event) {
  imagePopup.classList.add('popup_opened')
  document.querySelector('.popup__card-image').src = event.target.src;
  document.querySelector('.popup__caption').textContent = event.target.alt;
}

function closeImagePopup() {
  imagePopup.classList.remove('popup_opened')
}

// листинеры
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
popupEditButtonClose.addEventListener('click', closeEditPopup);
popupAddButtonClose.addEventListener('click', closeAddPopup);
popupImageButtonClose.addEventListener('click', closeImagePopup);
editform.addEventListener('submit', editFormSubmitHandler);
addform.addEventListener('submit', addFormSubmitHandler);

//добавление карточек
function render() {
  initialCards.forEach(createCard);
}

function createCard(initialCards) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.cards__title').textContent = initialCards.name;
  card.querySelector('.cards__image').src = initialCards.link;
  card.querySelector('.cards__image').alt = initialCards.name;
  card.querySelector('.cards__like').addEventListener('click', activateLike);
  card.querySelector('.cards__basket').addEventListener('click', deleteCard);
  card.querySelector('.cards__image').addEventListener('click', openImagePopup);
  cardsList.appendChild(card);
}
render();

function createNewCard() {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.cards__title').textContent = popupAddCardName.value;
  card.querySelector('.cards__image').src = popupAddCardLink.value;
  card.querySelector('.cards__image').alt = popupAddCardName.value;
  card.querySelector('.cards__like').addEventListener('click', activateLike);
  card.querySelector('.cards__basket').addEventListener('click', deleteCard);
  card.querySelector('.cards__image').addEventListener('click', openImagePopup);
  cardsList.prepend(card);
}

// сабмиты
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditNameInput.value;
  profileJob.textContent = popupEditJobInput.value;
  closeEditPopup()
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  createNewCard(popupAddCardName, popupAddCardLink)
  closeAddPopup()
}

// лайки
function activateLike(event) {
  event.target.classList.toggle('cards__like_active');
}
// удаление карточки
function deleteCard(event) {
  event.target.closest('.cards__item').remove();
}
