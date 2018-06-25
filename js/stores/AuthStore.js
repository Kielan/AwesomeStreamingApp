'use strict'
import { observable, computed } from 'mobx'
import { Actions } from 'react-native-router-flux'
import GoogleSignIn from 'react-native-google-sign-in'
import HomeViewStore from './HomeViewStore'

class AuthStore {
  // Indicates whether user is logged in
  @observable user;
  @computed get isLoggedIn() {
    return this.user
  }
  setUser(user) {
    this.user = user
  }
  unsetUser() {
    this.user = null
  }
  async signInWithGoogle() {
    try {
      const user = await GoogleSignIn.signInPromise()
      console.log('google signin', user, 'check this.props for authStore', this.props)
      this.setUser(user)
      await HomeViewStore.gatherLiveStream()
      await HomeViewStore.getLiveStreamDetails()
//      await HomeViewStore.getChatMessages()
      HomeViewStore.view.viewLoaded = true

      Actions.home()
    } catch (err) {
      console.log('catch err', err)
    }
  }
}

export default new AuthStore()
