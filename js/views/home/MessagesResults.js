'use strict'
import React, { Component } from 'react'
import {
  View, FlatList,
} from 'react-native'
import { observer } from 'mobx-react/native'
import { WINDOW_CONST, COLORS } from '../../constants'
import ChatMessage from './ChatMessage'

@observer
export default class MessagesResults extends Component {
  render() {
    const { data, filter, } = this.props
    const messages = Array.isArray(data) ? data : []
    console.log('MessagesResults render() data', data, 'messages', messages)
    console.log('MessagesResults render() filter', filter)
    return (
      <View style={styles.chatContainer}>
        <FlatList
         style={styles.messageList}
         data={messages}
         renderItem={data => <ChatMessage data={data} />}
         keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}
const styles = {
  chatContainer: {
    flex: 1,
    width: WINDOW_CONST.width,
    backgroundColor: COLORS.ORANGE,
    flexDirection: 'column',
    alignItems: 'center',
  },
  messageList: {
    backgroundColor: COLORS.ORANGE_SECOND,
    overflow: 'visible',
    width: WINDOW_CONST.width,
    minWidth: WINDOW_CONST.width,
    flex: 1,
    flexDirection: 'column',
    overflow: 'scroll'
  },
}
