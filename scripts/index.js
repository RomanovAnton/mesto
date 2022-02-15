
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_edit-profile');
const addPopup = document.querySelector('.popup_add-card');
const imagePopup = document.querySelector('.popup_image');
const popupEditNameInput = document.querySelector('.popup__profile-name');
const popupEditJobInput = document.querySelector('.popup__profile-job');
const popupAddCardName = document.querySelector('.popup__card-name');
const popupAddCardLink = document.querySelector('.popup__card-link');
const editform = document.querySelector('.popup__edit-form');
const addform = document.querySelector('.popup__add-form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.cards__template').content;
const popups = Array.from(document.querySelectorAll('.popup'));
const linkImage = document.querySelector('.popup__card-image');
const nameImage = document.querySelector('.popup__caption');


function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc)
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupCloseEscape = document.querySelector('.popup_opened')
    closePopup(popupCloseEscape)
  }
}

function addProfileData() {
  popupEditNameInput.value = profileName.textContent;
  popupEditJobInput.value = profileJob.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditNameInput.value;
  profileJob.textContent = popupEditJobInput.value;
  closePopup(editPopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(cardsList, createCard(popupAddCardName.value, popupAddCardLink.value));
  addform.reset();
  closePopup(addPopup);
}


function addCard(container, element) {
  container.prepend(element)
}

function addInfoImage(name, link) {

  nameImage.textContent = name;
  nameImage.alt = name;
  linkImage.src = link;
}

function createCard(name, link) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.cards__image');
  const cardTitle = card.querySelector('.cards__title');
  const cardLike = card.querySelector('.cards__like');
  const cardBasket = card.querySelector('.cards__basket');
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardBasket.addEventListener('click', deleteCard);
  cardLike.addEventListener('click', toggleLike);
  cardImage.addEventListener('click', () => {
    addInfoImage(name, link),
      openPopup(imagePopup)
  });
  return card;
}

function toggleLike(event) {
  event.target.classList.toggle('cards__like_active');
}

function deleteCard(event) {
  event.target.closest('.cards__item').remove();
}


editButton.addEventListener('click', () => {
  openPopup(editPopup),
    addProfileData()
});

addButton.addEventListener('click', () => {
  openPopup(addPopup)
});


editform.addEventListener('submit', handleProfileFormSubmit);
addform.addEventListener('submit', handleAddFormSubmit);


initialCards.forEach((data) => {
  addCard(cardsList, createCard(data.name, data.link))
});


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__icon')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
  })
})






