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
  popupDeleteConfirm,
  editform,
  addform
} from '../utils/constants.js'

import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator, config } from '../components/FormValidator.js'
import { api } from '../components/Api.js'
import './index.css'


let userId

api.getProfile()
  .then((res) => {
    userInfo.setUserInfo({
      profileName: res.name,
      profileJob: res.about,
    })
    userId = res._id
  })

api.getCards()
  .then((data) => {
    data.forEach((item) => {
      cards.addItem(createCard({
        name: item.name,
        link: item.link,
        likes: item.likes,
        owner: item.owner,
        cardId: item._id
      }))
    })
  })



const popopImageData = new PopupWithImage(imagePopup)

const popupEditForm = new PopupWithForm({
  popup: editPopup,
  handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData)
    api.editProfile({
      name: formData.profileName,
      job: formData.profileJob
    })
  }
})

const popupAddForm = new PopupWithForm({
  popup: addPopup,
  handleSubmitForm: (formData) => {
    api.addCard({
      name: formData.name,
      link: formData.link,
    })
      .then((res) => {
        cards.addItem(createCard({
          name: res.name,
          link: res.link,
          likes: res.likes,
          owner: res.owner,
          cardId: res._id
        }
        ));
      })

  }
})

const popupDelConfirm = new PopupWithForm({
  popup: popupDeleteConfirm
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
    userId,
    handleCardClick: () => {
      popopImageData.open(item)
      console.log(item)
    },
    handleDeleteCard: (cardId) => {
      popupDelConfirm.open()
      popupDelConfirm.changeHandleSubmitForm(() => {
        api.deleteCard(cardId)
          .then((res) => {
            card.deleteCard()
          })
      })

    },
  });
  const cardElement = card.generateCard()
  return cardElement
}

const cards = new Section({ items: [] }, cardsList)




editButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo()
  popupEditForm.open()
  popupEditNameInput.value = name
  popupEditJobInput.value = job
});

addButton.addEventListener('click', () => {
  popupAddForm.open()
});


// const formValidators = {}
// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector))
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(config, formElement)
//     const formName = formElement.getAttribute('name')
//     formValidators[formName] = validator;
//     validator.enableValidation();
//   });
// };

// enableValidation(config);
// formValidators['deleteConfirmForm'].resetValidation();

const editProfileValidator = new FormValidator(config, editform)
const addCardValidator = new FormValidator(config, addform)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()





