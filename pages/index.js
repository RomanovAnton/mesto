import {
  initialCards,
  cardsList,
  editPopup,
  addPopup,
  imagePopup,
  editButton,
  addButton,
  popupEditNameInput,
  popupEditJobInput,
  profileName,
  profileJob

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
  test.getUserInfo()
  // popupEditNameInput.value = test.getUserInfo().profileName
  // popupEditJobInput.value = test.getUserInfo().profileJob

  edit.setEventListeners()
});

addButton.addEventListener('click', () => {
  const add = new Popup(addPopup)
  add.open()
  add.setEventListeners()
});





const editForm = new PopupWithForm({
  popup: editPopup,
  handleSubmitForm: (formData) => {
    
    test.setUserInfo(formData)
    
  }
})

editForm.setEventListeners()

const addForm = new PopupWithForm({
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

addForm.setEventListeners()




const test = new UserInfo(profileName, profileJob)





// РАБОЧИЙ
// const editForm = new PopupWithForm({
//   popup: editPopup,
//   handleSubmitForm: (formData) => {
//     profileName.textContent = formData.profileName
//     profileJob.textContent = formData.profileJob
//   }
// })










// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileName.textContent = popupEditNameInput.value;
//   profileJob.textContent = popupEditJobInput.value;
//   closePopup(editPopup);
// }

// function handleAddFormSubmit(evt) {
//   evt.preventDefault();
//   createNewCard();
//   addform.reset();
//   closePopup(addPopup);
// }




// editform.addEventListener('submit', handleProfileFormSubmit);
// addform.addEventListener('submit', handleAddFormSubmit);





// const editProfileValidator = new FormValidator(config, editform)
// const addCardValidator = new FormValidator(config, addform)
// editProfileValidator.enableValidation()
// addCardValidator.enableValidation()
// renderElements()





