import {
  cardsList,
  editPopup,
  addPopup,
  imagePopup,
  popupDeleteConfirm,
  popupChangeAvatar,
  editButton,
  addButton,
  changeAvatarButton,
  profileName,
  profileJob,
  profileAvatar,
  popupEditNameInput,
  popupEditJobInput,
  editform,
  addform,
  avatarForm,
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

Promise.all([api.getProfile(), api.getCards()])
  .then(([userData, cardsData]) => {

    userInfo.setUserInfo({
      profileName: userData.name,
      profileJob: userData.about,
    })
    userInfo.setUserAvatar({
      profileAvatar: userData.avatar
    })
    userId = userData._id

    cardsData.forEach((item) => {
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
    popupEditForm.changeButtonText('Сохранение...')
    
    api.editProfile({
      name: formData.profileName,
      job: formData.profileJob,
    }).then((res) => {
      profileAvatar.src = res.avatar
      popupEditForm.close()
      popupEditForm.changeButtonText('Сохранить')
    })
  }
})

const popupAddForm = new PopupWithForm({
  popup: addPopup,
  handleSubmitForm: (formData) => {
    popupAddForm.changeButtonText('Сохранение...')
    api.addCard({
      name: formData.name,
      link: formData.link,
    })
      .then((res) => {
        cards.addNewItem(createCard({
          name: res.name,
          link: res.link,
          likes: res.likes,
          owner: res.owner,
          cardId: res._id
        }
        ));
        popupAddForm.close()
        popupAddForm.changeButtonText('Создать')
      })
  }
})

const popupChangeAvatarForm = new PopupWithForm({
  popup: popupChangeAvatar,
  handleSubmitForm: (formData) => {
    popupChangeAvatarForm.changeButtonText('Сохранение...')
    api.changeAvatar(formData.avatarLink)
      .then((res) => {
        profileAvatar.src = res.avatar
        popupChangeAvatarForm.close()
        popupChangeAvatarForm.changeButtonText('Сохранить')
      })
  }
})

const popupDelConfirm = new PopupWithForm({
  popup: popupDeleteConfirm
})

const userInfo = new UserInfo(profileName, profileJob, profileAvatar)
const cards = new Section({ items: [] }, cardsList)

popopImageData.setEventListeners()
popupEditForm.setEventListeners()
popupAddForm.setEventListeners()
popupDelConfirm.setEventListeners()
popupChangeAvatarForm.setEventListeners()

function createCard(item) {
  const card = new Card({
    data: item,
    templateSelector: '.cards__template',
    userId,
    handleCardClick: () => {
      popopImageData.open(item)
    },
    handleDeleteCard: (cardId) => {
      popupDelConfirm.open()
      popupDelConfirm.changeHandleSubmitForm(() => {
        popupDelConfirm.changeButtonText('Удаление...')
        api.deleteCard(cardId)
          .then(() => {
            card.deleteCard()
            popupDelConfirm.close()
            popupDelConfirm.changeButtonText('Да')
          })
      })
    },
    hundleLikeClick: (cardId) => {
      if (card.isLiked()) {
        api.deleteLike(cardId)
          .then((res) => card.setLikes(res.likes))
      } else {
        api.addLike(cardId)
          .then((res) => card.setLikes(res.likes))
      }
    },
  });
  const cardElement = card.generateCard()
  return cardElement
}


editButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo()
  popupEditForm.open()
  popupEditNameInput.value = name
  popupEditJobInput.value = job
});

addButton.addEventListener('click', () => {
  popupAddForm.open()
});

changeAvatarButton.addEventListener('click', () => {
  popupChangeAvatarForm.open()
});

const editProfileValidator = new FormValidator(config, editform)
const addCardValidator = new FormValidator(config, addform)
const changeAvatarValidator = new FormValidator(config, avatarForm)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()
changeAvatarValidator.enableValidation()




