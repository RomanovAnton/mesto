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
  popupEditNameInput,
  popupEditJobInput,
  popupDeleteConfirm
} from '../utils/constants.js'

import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator, config } from '../components/FormValidator.js'
import { api } from '../components/Api.js'
import './index.css'

const popopImageData = new PopupWithImage(imagePopup)

const popupEditForm = new PopupWithForm({
  popup: editPopup,
  handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData)
    console.log(formData)
    api.editProfile({
      name: formData.profileName,
      job: formData.profileJob
    })
  }
})

const popupAddForm = new PopupWithForm({
  popup: addPopup,
  handleSubmitForm: (formData) => {
    cards.addItem(createCard(formData));
    api.addCard(formData)
  }
})

const popupDelConfirm = new PopupWithForm({
  popup: popupDeleteConfirm,
  handleSubmit: () => {
    console.log(formData)
  }
})


const userInfo = new UserInfo(profileName, profileJob)

popopImageData.setEventListeners()
popupEditForm.setEventListeners()
popupAddForm.setEventListeners()
popupDelConfirm.setEventListeners()


function createCard(item) {
  const card = new Card({
    data: item,
    templateSelector: '.cards__template',
    handleCardClick: () => {
      popopImageData.open(item)
    },
    handleDeleteCard: () => {
      popupDelConfirm.open()
    }
  });
  const cardElement = card.generateCard()
  return cardElement
}

const cards = new Section({
  items: [],
  renderer: (item) => {
    cards.addItem(createCard(item));
  }
}, cardsList)

cards.renderer();


editButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo()
  popupEditForm.open()
  popupEditNameInput.value = name
  popupEditJobInput.value = job
});

addButton.addEventListener('click', () => {
  popupAddForm.open()
});


const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
formValidators['deleteConfirmForm'].resetValidation();



api.getProfile()
  .then((res) => {
    userInfo.setUserInfo({
      profileName: res.name,
      profileJob: res.about
    })
  })

api.getCards()
  .then((data) => {
    data.forEach((item) => {
      cards.addItem(createCard(item))
    })
  })
