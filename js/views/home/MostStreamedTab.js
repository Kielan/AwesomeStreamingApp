'use strict'
import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, Image, LayoutAnimation,
} from 'react-native'
import { observer } from 'mobx-react'
import { COLORS, WINDOW_CONST } from '../../constants'
import ChatView from './ChatView'
import VideoPlayer from './VideoPlayer'

@observer
class MostStreamedTab extends Component {
  constructor(props) {
    super(props)
  }
  _sendChat() {
    console.log('sendChat')
  }
  render() {
    const { authStore, homeViewStore, chatStore } = this.props
    const videoUrl = `https://www.youtube.com/embed/${homeViewStore.view.mainVideoId}?rel=0&autoplay=1&showinfo=0&controls=1`//`+homeViewStore.view.mainVideoId
    console.log('MostStreamedTab videoUrl', videoUrl)
    return (
      <View style={styles.viewContainer}>
        <View style={styles.viewBody}>
        <VideoPlayer
          video={videoUrl}
        />
        <ChatView authStore={authStore} homeViewStore={homeViewStore} chatStore={chatStore} />
        </View>
      </View>
    )
  }
}

export default MostStreamedTab

const styles = {
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.ORANGE,
    height: WINDOW_CONST.height,
  },
  viewBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
  caption: {
    width: 320,
    height: 180,
  }
}
