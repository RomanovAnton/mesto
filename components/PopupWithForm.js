import { Popup } from '../components/Popup.js'

export class PopupWithForm extends Popup {
  constructor({ popup, handleSubmitForm }) {
    super(popup);
    this._form = this._popup.querySelector('.popup__form')
    this._handleSubmitForm = handleSubmitForm;
  }

  // test(){
  //   console.log(this._form)
  // }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input')
    this._formValues = {};
    this._inputList.forEach(input => 
      this._formValues[input.name] = input.value)
    return this._formValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close()
    })

  }

  close() {
    super.close()
    this._form.reset()
  }
}

