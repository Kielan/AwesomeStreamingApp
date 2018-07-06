'use strict'
import { observable, computed } from 'mobx'
import { Actions } from 'react-native-router-flux'
import GoogleSignIn from 'react-native-google-sign-in'
import {default as $http} from 'axios'
import { GOOGLE_KEY, YOUTUBE_API_URL } from '../constants'
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
  awesomeStreamingAppSignin
  async signInWithGoogle() {
    try {
      const user = await GoogleSignIn.signInPromise()
      console.log('google signin', user, 'check this.props for authStore', this.props)
      this.setUser(user)
      await this.gatherLiveStream()
      await this.getLiveStreamDetails()
//      await HomeViewStore.getChatMessages()
      HomeViewStore.view.viewLoaded = true

      Actions.home()
    } catch (err) {
      console.log('catch err', err)
    }
  }
  gatherLiveStream = async () => {
    try {
        let popularVideo = await $http({
          method: 'GET',
          url: YOUTUBE_API_URL+'search/',
          headers: '',
          params: {
            part: "snippet",
            chart: "mostPopular",
            eventType: "live",
            type: "video",
            key: GOOGLE_KEY
          }
        })
        let snippetURL = popularVideo
        console.log('popularVideo thumbnailurl', popularVideo.data.items[0].id.videoId, 'dont confand a ?', snippetURL)
        HomeViewStore.view.mainThumbnailURL = popularVideo.data.items[0].snippet.thumbnails.high.url
        HomeViewStore.view.mainThumbnailID = popularVideo.data.items[0].id.videoId
    } catch (err) {
      console.log('could not handle url: ', err)
    }
  }
  getLiveStreamDetails = async () => {
    try {
      let liveStreamDetails = await $http({
        method: 'GET',
        url: YOUTUBE_API_URL+'videos/',
        headers: '',
        params: {
          part: "snippet, liveStreamingDetails",
          id: HomeViewStore.view.mainThumbnailID,
          key: GOOGLE_KEY
        }
      })
      console.log('liveStreamDetails', liveStreamDetails, liveStreamDetails.data.items[0])
      HomeViewStore.view.activeLiveChatId = liveStreamDetails.data.items[0].liveStreamingDetails.activeLiveChatId
    } catch (err) {
      console.log('could not handle details url: ', err)
    }
  }
}

export default new AuthStore()
