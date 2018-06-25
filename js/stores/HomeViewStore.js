'use strict'
import { observable, computed, action } from 'mobx'
import {default as $http} from 'axios'
import { GOOGLE_KEY, YOUTUBE_API_URL } from '../constants'
import { queryChat } from '../services/chatService'

class HomeViewStore {
  @observable view = {}
  @observable messages = []
  @observable analyticsTab = {
    messagesSearchValue: ''
  }
  @computed get computedChatArchiveQuery() {
    return this.messages
  }
  @action setMessages(newMessages) {
    this.messages = newMessages
  }
  @action messagesSearch(e) {
    this.analyticsTab.messagesSearchValue = e.target.value
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
        this.view.mainThumbnailURL = popularVideo.data.items[0].snippet.thumbnails.high.url
        this.view.mainThumbnailID = popularVideo.data.items[0].id.videoId
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
          id: this.view.mainThumbnailID,
          key: GOOGLE_KEY
        }
      })
      console.log('liveStreamDetails', liveStreamDetails, liveStreamDetails.data.items[0])
      this.view.activeLiveChatId = liveStreamDetails.data.items[0].liveStreamingDetails.activeLiveChatId
    } catch (err) {
      console.log('could not handle details url: ', err)
    }
  }
  getChatMessages = async () => {
    console.log('liveStreamChatMessages', this.view.activeLiveChatId)
    try {
      let getChatMessages = await queryChat()
      console.log('liveStreamChatMessages', getChatMessages.data)
      let messages = getChatMessages.data.items.map(item => {
        let usefulObj = {
          displayName: item.authorDetails.displayName,
          profileImageUrl: item.authorDetails.profileImageUrl,
          messageText: item.snippet.textMessageDetails.messageText,
          publishedAt: item.snippet.publishedAt,
        }
        return usefulObj
      })
      this.setMessages(messages)
    } catch (err) {
      console.log('could not get messages: ', err)
    }
  }

}
export default new HomeViewStore();
