'use strict'
import { observable, action } from 'mobx'
import { GOOGLE_KEY, YOUTUBE_API_URL } from '../constants'

class ChatStore {
  @observable messageBoxInputValue = ''
  @action setMessageBoxInputValue(newVal) {
    this.messageBoxInputValue = newVal
  }
}

export default new ChatStore()
