import { Popup } from './Popup.js'
import {
  popupCaption,
  popupCardImage
} from '../utils/constants.js'


export class PopupWithImage extends Popup {
  constructor(item, popup) {
    super(popup)
    this._title = item.name;
    this._image = item.link;
  }

  open() {
    super.open()
    popupCaption.textContent = this._title;
    popupCardImage.alt = this._title;
    popupCardImage.src = this._image;
  }
}


