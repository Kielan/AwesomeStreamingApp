'use strict'
import { observable, computed, action } from 'mobx'
import {default as $http} from 'axios'
import { GOOGLE_KEY, YOUTUBE_API_URL } from '../constants'
import { queryChat } from '../services/chatService'

class HomeViewStore {
  @observable view = {}
  @observable messages = []
  @observable messagesLowercase = []
  @observable analyticsTab = {
    messagesSearchValue: ''
  }
  @computed get computedChatArchiveQuery() {
    if(!this.analyticsTab.messagesSearchValue) {
      return this.messages
    }
    const newMessages = []
    if (this.analyticsTab.messagesSearchValue.includes('has:')) {
      return this.messagesLowercase.filter(item =>
        {
          console.log('computed this.messages.filter', item)
          if (item.displayName.includes(this.analyticsTab.messagesSearchValue)) {
            return item
          }
        }
      )
    } else if (this.analyticsTab.messagesSearchValue.includes('from:')) {
      const searchQuery = this.analyticsTab.messagesSearchValue.substr(6)
      return this.messagesLowercase.filter(item =>
        {
          console.log('computed find by author', item)
          if (item.displayName.includes(searchQuery)) {
            return item
          }
        }
      )
    }

  }
  @action setMessages(newMessages) {
    this.messages = newMessages
    this.messagesLowercase = newMessages.map((message) => {
      message.messageText = message.messageText.toLowerCase()
      return message
    })
  }
  @action.bound messagesSearch(e) {
    console.log('messagesSearch action', e)
    this.analyticsTab.messagesSearchValue = e
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
