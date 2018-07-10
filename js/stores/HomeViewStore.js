'use strict'
import { autorun, observable, computed, action, reaction, toJS } from 'mobx'
import {default as $http} from 'axios'
import { GOOGLE_KEY, YOUTUBE_API_URL } from '../constants'
import { queryChat } from '../services/chatService'
import { createLiveStreamChannelActivityOverview } from '../services/d3Service'
import DataViewStore from './DataViewStore'

class HomeViewStore {
  constructor() {
    autorun(() => {
      console.log('autorun', this.liveChatData.messagesList)
    })
  }
  @observable view = {}
  @observable analyticsTab = {
    messagesSearchValue: ''
  }
  @observable liveChatData = {
    messagesList: [],
    messagesLowercase: [],
  }
  @observable chartData = {
    messagesActivity: [],
    activityPeak: 0,
    activityFloor: 0,
  }
  @action initPollService() {
    if (!this.fetchInterval) {
      this.queryChat(this.view.activeLiveChatId).then((thenData) => this.setMessagesData(thenData)) // initial fetch
      this.fetchInterval = setInterval(() => this.queryChat(this.view.activeLiveChatId).then((thenData) => {
        this.setMessagesData(thenData)
      }), 12000)
    }
  }
  // call from componentWillUnmount or whatever
  @action disposePollService() {
    if (this.fetchInterval) {
      clearTimeout(this.fetchInterval);
      this.fetchInterval = null;
    }
  }
  @action setMessagesData(remoteChatResponse) {
    const cleanedData = remoteChatResponse.data.items.map(item => {
      const usefulObj = {
        displayName: item.authorDetails.displayName,
        profileImageUrl: item.authorDetails.profileImageUrl,
        messageText: item.snippet.textMessageDetails.messageText,
        publishedAtISO: item.snippet.publishedAt,
        publishedAtSinceEpoch: new Date(item.snippet.publishedAt).getTime(),
      }
      return usefulObj
    })
    const scopeChatArchiveLowerCase = cleanedData.map((item, key) => {
      item.messageText = item.messageText.toLowerCase()
      return item
    })
//    console.log('scopeChatArchiveLowerCase => ', scopeChatArchiveLowerCase)
    const chartDataOverView = createLiveStreamChannelActivityOverview(scopeChatArchiveLowerCase)
    console.log('chartDataOverView => ', chartDataOverView)
    this.chartData = chartDataOverView
    this.liveChatData = {messagesList: cleanedData}
    return
  }
  @action async homeViewTimeOut(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  @action async getLiveChatHistory(activeLiveChatId) {
    try {
      var queryNextTokenId = ''
      var maxHistoryPages = 6
      let historyPagePivot = 0
      let nextQueryChatResponse = []
      var cleanedData = []
      let buildChatList = []
      let queryChatResponse = await this.queryChat(this.view.activeLiveChatId)
      if (queryChatResponse.data.nextPageToken) {
        queryNextTokenId = queryChatResponse.data.nextPageToken
      }
      console.log('getLiveChatHistory queryChatResponse', queryChatResponse)
      cleanedData = queryChatResponse.data.items.map(item => ({
          displayName: item.authorDetails.displayName,
          profileImageUrl: item.authorDetails.profileImageUrl,
          messageText: item.snippet.textMessageDetails.messageText,
          publishedAtISO: item.snippet.publishedAt,
          publishedAtSinceEpoch: new Date(item.snippet.publishedAt).getTime(),
      }))
      buildChatList = [ ...cleanedData ]
      console.log('queryNextTokenId', typeof queryNextTokenId, queryNextTokenId)
      if (queryNextTokenId && historyPagePivot < maxHistoryPages) {
        console.log('if queryNextTokenId', queryNextTokenId)
        for (var i = 0; i < maxHistoryPages; ++i) {
          await this.homeViewTimeOut(3085)
          nextQueryChatResponse = await this.queryChat(this.view.activeLiveChatId, queryNextTokenId)

          console.log('getLiveChatHistory nextQueryChatResponse', nextQueryChatResponse)

          queryNextTokenId = nextQueryChatResponse.data.nextPageToken
          cleanedData = nextQueryChatResponse.data.items.map(item => ({
              displayName: item.authorDetails.displayName,
              profileImageUrl: item.authorDetails.profileImageUrl,
              messageText: item.snippet.textMessageDetails.messageText,
              publishedAtISO: item.snippet.publishedAt,
              publishedAtSinceEpoch: new Date(item.snippet.publishedAt).getTime(),
          }))
          buildChatList.push(cleanedData)
          historyPagePivot += 1
        }
      }
      historyPagePivot = 0
      return buildChatList
    } catch (err) {
      console.log('getLiveChatHistory err', err)
    }
  }
  @action async queryChat(activeLiveChatId, pageTokenId) {
    try {
      let getChatMessages = await $http({
        method: 'GET',
        url: YOUTUBE_API_URL+'liveChat/messages/',
        headers: '',
        params: {
          part: "id, snippet, authorDetails",
          liveChatId: activeLiveChatId,
          ...pageTokenId != 'undefined' && { pageToken: pageTokenId },
          maxResults: 2000,
          key: GOOGLE_KEY,
        }
      })
      console.log('query chat: ', getChatMessages)
      return getChatMessages
    } catch (err) {
      console.log('could not handle details url: ', err)
    }
  }
  @action setStore(key, value) {
    this[key] = { ...value }
  }
  @action.bound messagesSearch(e) {
    console.log('messagesSearch action', e)
    this.analyticsTab.messagesSearchValue = e
  }

}
export default new HomeViewStore();
