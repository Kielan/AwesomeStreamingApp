import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { COLORS } from '../../constants'
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
    const { homeViewStore, chatStore } = this.props
    return (
      <View style={styles.viewContainer}>
        <View style={styles.hOneContainer}><Text style={styles.text}>Most Streamed</Text></View>
        <View style={styles.viewBody}>
        { homeViewStore.view.viewLoaded === true && <Image source={{ uri: homeViewStore.view.mainThumbnailURL }} style={styles.caption}>
          </Image> }
        { homeViewStore.view.viewLoaded === true && <ChatView homeViewStore={homeViewStore} chatStore={chatStore} /> }
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
    paddingBottom: 20,
    marginBottom: 20,
    bottom: 20,
  },
  hOneContainer: {
    height: 30,
  },
  viewBody: {
    height: 740,
    minHeight: 740,
    maxHeight: 740,
    paddingBottom: 20,
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
