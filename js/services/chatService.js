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
            publishedAt: item.snippet.publishedAt,
          }
          return usefulObj
        })
        console.log('pollMessagesService interval newMessages: ', newMessages)
        resolve(newMessages)
      })
    }, 15000)
  })
}
//YoutubeAPI.messagesList
export async function queryChat(activeLiveChatId) {
  try {
    let getChatMessages = await $http({
      method: 'GET',
      url: YOUTUBE_API_URL+'liveChat/messages/',
      headers: '',
      params: {
        part: "snippet, authorDetails",
        liveChatId: activeLiveChatId,
        key: GOOGLE_KEY
      }
    })
    return getChatMessages
  } catch (err) {
    console.log('could not handle details url: ', err)
  }
}
//YoutubeAPI.textMessageInsert
export async function sendChatMessageWithYoutubeAPI(activeLiveChatId, messageText) {
  try {
    console.log('sendChatMessageWithYoutubeAPI', activeLiveChatId, messageText)
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
      data: JSON.stringify({snippet: messageSnippet}),
      params: {
        part: 'snippet',
        alt: 'json',
        key: GOOGLE_KEY,
      }
    })
    console.log('sendChatMessageWithYoutubeAPI press', liveStreamMessageInsertResponse)

  } catch (err) {
    console.log('catch textMessageInsert err', err.message, err)
  }
}
