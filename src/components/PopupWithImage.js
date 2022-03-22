import { Popup } from './Popup.js'
export class PopupWithImage extends Popup {

  open(item) {
    super.open()
    const popupCaption = this._popup.querySelector('.popup__caption')
    const popupImage = this._popup.querySelector('.popup__card-image')
    popupCaption.textContent = item.name;
    popupImage.alt = item.name;
    popupImage.src = item.link;
  }
}


