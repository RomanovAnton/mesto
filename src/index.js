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
} from '../src/utils/constants.js'

import { Card } from '../src/components/Card.js'
import { Section } from '../src/components/Section.js'
import { Popup } from '../src/components/Popup.js'
import { PopupWithImage } from '../src/components/PopupWithImage.js'
import { PopupWithForm } from '../src/components/PopupWithForm.js'
import { UserInfo } from '../src/components/UserInfo.js'
import { FormValidator, config } from '../src/components/FormValidator.js'
import './styles/index.css'

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
  const popupEdit = new Popup(editPopup)
  popupEdit.open()
  userInfo.getUserInfo()
  popupEdit.setEventListeners()
});

addButton.addEventListener('click', () => {
  const popupAdd = new Popup(addPopup)
  popupAdd.open()
  popupAdd.setEventListeners()
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






