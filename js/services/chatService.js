'use strict'
import {default as $http} from 'axios'
import { GOOGLE_KEY, YOUTUBE_API_URL } from '../constants'

export function pollMessagesService(activeLiveChatId) {
  return new Promise(function(resolve) {
    const pollingService = setInterval(function() {
      return queryChat(activeLiveChatId).then((dirtyMessages) => {
        const newMessages = dirtyMessages.data.items.map(item => {
          const usefulObj = {
            displayName: item.authorDetails.displayName,
            profileImageUrl: item.authorDetails.profileImageUrl,
            messageText: item.snippet.textMessageDetails.messageText,
            publishedAtISO: item.snippet.publishedAt,
            publishedAtSinceEpoch: new Date(item.snippet.publishedAt).getTime(),
          }
          return usefulObj
        })
        resolve(newMessages)
      })
    }, 15000)
  })
}
//YoutubeAPI.messagesList
export async function queryChat(activeLiveChatId, pageTokenId) {
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
//YoutubeAPI.textMessageInsert
export async function sendChatMessageWithYoutubeAPI(activeLiveChatId, messageText, access_token) {
  try {
    const messageSnippet = {
      liveChatId: activeLiveChatId,
      type: 'textMessageEvent',
      textMessageDetails: {
        messageText: messageText
      }
    }
    let liveStreamMessageInsertResponse = await $http({
      method: 'POST',
      url: YOUTUBE_API_URL+'liveChat/messages/',
      data: {snippet: messageSnippet},//JSON.stringify(
      params: {
        part: 'snippet',
        alt: 'json',
        access_token: access_token,
      }
    })
    console.log('sendChatMessageWithYoutubeAPI press', liveStreamMessageInsertResponse)

  } catch (err) {
    console.log('catch textMessageInsert err', err.message, err)
  }
}
export async function liveChatStepThroughPageTokens(activeLiveChatId) {
  try {
    var pagesArray = []
    var arrayBlock = []
    var chatResponse
    var nextPageToken
    var totalResults
    var resultsPerPage
    var newMessages

    console.log('queryChatStepThroughPageTokens', pagesArray)
    chatResponse = await queryChat(activeLiveChatId)
    console.log('queryChatStepThroughPageTokens i<1 1st chat response', chatResponse)

    nextPageToken = chatResponse.data.nextPageToken
    totalResults = chatResponse.data.totalResults
    resultsPerPage = chatResponse.data.resultsPerPage
    newMessages = chatResponse.data.items.map(item => {
      const usefulObj = {
        displayName: item.authorDetails.displayName,
        profileImageUrl: item.authorDetails.profileImageUrl,
        messageText: item.snippet.textMessageDetails.messageText,
        publishedAtISO: item.snippet.publishedAt,
        publishedAtSinceEpoch: new Date(item.snippet.publishedAt).getTime(),
      }
      return usefulObj
    })
    pagesArray.push(newMessages)
/*
    if (totalResults > resultsPerPage) {
      var numberOfRequests = resultsPerPage / totalResults
      for (var i = 0; i < numberOfRequests; i++) {
        chatResponse = await queryChat(activeLiveChatId, nextPageToken)
        nextPageToken = chatResponse.data.nextPageToken; console.log('stepThroughPageTokens nextPageToken', nextPageToken)

        const newMessages = chatResponse.data.items.map(item => {
          const usefulObj = {
            displayName: item.authorDetails.displayName,
            profileImageUrl: item.authorDetails.profileImageUrl,
            messageText: item.snippet.textMessageDetails.messageText,
            publishedAtISO: item.snippet.publishedAt,
            publishedAtSinceEpoch: new Date(item.snippet.publishedAt).getTime(),
          }
          return usefulObj
        })
        pagesArray.push(newMessages)
      }
    }*/
    console.log('pagesArray final', pagesArray)
    return pagesArray
  } catch (err) {
    console.log('catch textMessageInsert err', err.message, err)
  }
}
