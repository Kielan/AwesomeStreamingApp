'use strict'
import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, Image, TextInput,
} from 'react-native'
import { observer } from 'mobx-react'
import { WINDOW_CONST, COLORS } from '../../constants'

@observer
export default class ChatMessage extends Component {
  render() {
    return (
      <View key={this.props.key} style={styles.chatMessageContainer}>
        <Text style={styles.text}>{this.props.data.item.messageText}</Text>
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
  chatMessageContainer: {
    minHeight: 20,
    height: 20,
    maxHeight: 20,
    flex: 1,
    backgroundColor: 'transparent',
  },
  text: {
    color: COLORS.BLACK,
    alignSelf: 'flex-start',
  }
}
