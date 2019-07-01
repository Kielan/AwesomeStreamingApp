'use strict'
import React, { Component } from 'react'
import { View, WebView} from 'react-native'
import { MATCH_URL } from '../../../constants'
import { callPlayer, parseStartTime } from '../../../services/videoPlayerService'
//const YT = require('yt-player')
export class YoutubePlayer extends Component {
  constructor(props) {
    super(props)
    this.onWebViewLoad.bind(this)
  }
  componentDidMount () {
//    this.load(this.props.url)
  }
  onWebViewLoad() {
    console.log('onWebViewLoad load called')
  }
  callPlayer = callPlayer
  load (url) {//isReady
    console.log('youtubeplayer.bound load called')
    const { playsinline, controls, config, onError } = this.props
    const id = url && url.match(MATCH_URL)[1]
    if (isReady) {
      this.player.cueVideoById({
        videoId: id,
        startSeconds: parseStartTime(url)
      })
      return
    }
}
/*    getSDK() {
      if (!this.container) return
      this.player = new YT.Player(this.container, {
        width: '100%',
        height: '100%',
        videoId: id,
        playerVars: {
          controls: controls ? 1 : 0,
          start: parseStartTime(url),
          origin: window.location.origin,
          playsinline: playsinline,
          ...config.youtube.playerVars
        },
        events: {
          onReady: this.props.onReady,
          onStateChange: this.onStateChange,
          onError: event => onError(event.data)
        }
      })
  }*/
  onStateChange = ({ data }) => {
    const { onPlay, onPause, onBuffer, onEnded, onReady } = this.props
    const { PLAYING, PAUSED, BUFFERING, ENDED, CUED } = window[SDK_GLOBAL].PlayerState
    if (data === PLAYING) onPlay()
    if (data === PAUSED) onPause()
    if (data === BUFFERING) onBuffer()
    if (data === ENDED) onEnded()
    if (data === CUED) onReady()
  }
  ref = container => {
    this.container = container
  }
  render() {
    const style = {
      width: '100%',
      height: '100%',
      ...this.props.style
    }//// stores a reference to the webview object in the WebviewScreen wrapper, to use for postMessage
    var webviewContent = require('./WebView.html')
    return (
      <View style={style}>
        <WebView
           onLoad={this.onWebViewLoad}
           ref={webview => {this.webViewRef = webview;}}
           source={webviewContent}
           onMessage={this.onWebViewMessage}
           style={{flex: 1}}
         />
      </View>
      )
  }
}
