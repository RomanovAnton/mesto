
function setInputValid(input, errorElement, inputErrorClass) {
  errorElement.textContent = '';
  input.classList.remove(inputErrorClass)
}

function setInputInvalid(input, errorElement, inputErrorClass) {
  errorElement.textContent = input.validationMessage;
  input.classList.add(inputErrorClass)
}

function enableButton(button, inactiveButtonClass) {
  button.removeAttribute('disabled')
  button.classList.remove(inactiveButtonClass)
}

function disableButton(button, inactiveButtonClass) {
  button.setAttribute('disabled', '')
  button.classList.add(inactiveButtonClass)
}

function checkImputValidity(form, input, inputErrorClass) {
  const errorElement = form.querySelector(`.${input.id}-error`)
  if (input.validity.valid) {
    setInputValid(input, errorElement, inputErrorClass)
  } else {
    setInputInvalid(input, errorElement, inputErrorClass)
  }
}
function checkButtonValidity(form, { submitButtonSelector, inactiveButtonClass }) {
  const button = form.querySelector(submitButtonSelector)
  if (form.checkValidity()) {
    enableButton(button, inactiveButtonClass)
  } else {
    disableButton(button, inactiveButtonClass)
  }
  form.addEventListener('reset', () => {
    disableButton(button, inactiveButtonClass)
  })
}


function setEventListenerInputs(form, { inputSelector, submitButtonSelector, inputErrorClass, inactiveButtonClass }) {

  const inputList = Array.from(form.querySelectorAll(inputSelector))

  checkButtonValidity(form, { submitButtonSelector, inactiveButtonClass })

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkImputValidity(form, input, inputErrorClass)
      checkButtonValidity(form, { submitButtonSelector, inactiveButtonClass })
    })
  })
}

function enableValidation({ formSelector, ...rest }) {
  const formsList = Array.from(document.querySelectorAll(formSelector));
  formsList.forEach((form) => {
    setEventListenerInputs(form, rest)
  })
}

const config = {
  formSelector: '.popup__form',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save'
}

enableValidation(config)
