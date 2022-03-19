import {
  initialCards,
  cardsList,
  editPopup,
  addPopup,
  imagePopup,
  editButton,
  addButton,
  profileName,
  profileJob,
  editform,
  addform
} from '../utils/constants.js'

import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { Popup } from '../components/Popup.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'

import { FormValidator, config, } from '../components/FormValidator.js'


const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      templateSelector: '.cards__template',
      handleCardClick: () => {
        const popopImageData = new PopupWithImage(item, imagePopup)
        popopImageData.open()
        popopImageData.setEventListeners()
      }
    });
    const cardElement = card.generateCard()

    cards.addItem(cardElement);
  }
}, cardsList)

cards.renderer();


editButton.addEventListener('click', () => {
  const edit = new Popup(editPopup)
  edit.open()
  userInfo.getUserInfo()
  edit.setEventListeners()
});

addButton.addEventListener('click', () => {
  const add = new Popup(addPopup)
  add.open()
  add.setEventListeners()
});

const popupEditForm = new PopupWithForm({
  popup: editPopup,
  handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData)
  }
})

popupEditForm.setEventListeners()

const popupAddForm = new PopupWithForm({
  popup: addPopup,
  handleSubmitForm: (formData) => {
    const newCard = new Card({
      data: formData,
      templateSelector: '.cards__template',
      handleCardClick: () => {
        const popopNewImageData = new PopupWithImage(formData, imagePopup)
        popopNewImageData.open()
        popopNewImageData.setEventListeners()
      }
    });
    const newCardElement = newCard.generateCard()
    cards.addItem(newCardElement);
  }
})
popupAddForm.setEventListeners()
const userInfo = new UserInfo(profileName, profileJob)



const editProfileValidator = new FormValidator(config, editform)
const addCardValidator = new FormValidator(config, addform)
editProfileValidator.enableValidation()
addCardValidator.enableValidation()






