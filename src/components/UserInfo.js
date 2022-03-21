import {
  popupEditNameInput,
  popupEditJobInput,
} from '../utils/constants.js'

export class UserInfo {
  constructor(profileName, profileJob) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  getUserInfo() {
    popupEditNameInput.value = this._profileName.textContent
    popupEditJobInput.value = this._profileJob.textContent
  }

  setUserInfo(data) {
    this._profileName.textContent = data.profileName
    this._profileJob.textContent = data.profileJob
  }

}



