'use strict'
import React, { Component } from 'react'
import {
  View, FlatList,
} from 'react-native'
import { observer } from 'mobx-react'
import { WINDOW_CONST, COLORS } from '../../constants'
import ChatMessage from './ChatMessage'

@observer
export default class MessagesResults extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { messages, filter, } = this.props
    console.log('MessagesResults render() data', 'messages', messages)
    console.log('MessagesResults render() filter', filter)
    return (
      <View style={styles.chatContainer}>
        <FlatList
         style={styles.messageList}
         data={messages.slice(0)}
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
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.ORANGE_SECOND,
  },
  messageList: {
    overflow: 'visible',
    width: WINDOW_CONST.width,
    minWidth: WINDOW_CONST.width,
    flex: 1,
    flexDirection: 'column',
    overflow: 'scroll'
  },
}
