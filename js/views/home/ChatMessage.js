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
        <View style={styles.chatAuthorView} >
          <Image style={{width: 40, height: 40, borderRadius: 20}} source={{uri: this.props.data.item.profileImageUrl}} />
        </View>
        <View style={styles.chatMessageBody}>
          <View><Text style={styles.authorText} >{this.props.data.item.displayName}</Text></View>
          <View><Text style={styles.text} >{this.props.data.item.messageText}</Text></View>
          <View style={styles.chatItemDivider} />
        </View>
      </View>
    )
  }
}

const styles = {
  chatContainer: {
    flex: 1,
    width: WINDOW_CONST.width,
    backgroundColor: COLORS.ORANGE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatMessageContainer: {
    minHeight: 60,
    height: 60,
    maxHeight: 180,
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginTop: 10
  },
  chatAuthorView: {
    justifyContent: 'flex-start',
    paddingTop: 2,
    paddingHorizontal: 10,
  },
  chatMessageBody: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 60,
  },
  authorText: {
      fontSize: 18,
      color: COLORS.BLACK,
      alignSelf: 'flex-start',
  },
  text: {
    color: COLORS.BLACK,
    alignSelf: 'flex-start',
    fontSize: 14,
  },
  chatItemDivider: {
    marginTop: 15,
    height: 2,
    maxHeight: 2,
    flex: 1,
    borderRadius: 1,
    backgroundColor: COLORS.ORANGE_FOURTH,
  },
}
