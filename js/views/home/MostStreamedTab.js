'use strict'
import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, Image, LayoutAnimation,
} from 'react-native'
import { observer } from 'mobx-react/native'
import { COLORS, WINDOW_CONST } from '../../constants'
import ChatView from './ChatView'

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
    return (
      <View style={styles.viewContainer}>
        <View style={styles.viewBody}>
        { homeViewStore.view.viewLoaded === true && <Image source={{ uri: homeViewStore.view.mainThumbnailURL }} style={styles.caption}>
          </Image> }
        { homeViewStore.view.viewLoaded === true && <ChatView authStore={authStore} homeViewStore={homeViewStore} chatStore={chatStore} /> }
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
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
  caption: {
    width: 300,
    height: 140,
  }
}
