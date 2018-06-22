'use strict'
import React, { Component } from 'react'
import {
  View, FlatList, Text, TouchableOpacity, Image, TextInput,
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { WINDOW_CONST, COLORS } from '../../constants'
import { pollMessagesService, sendChatMessageWithYoutubeAPI } from '../../services/chatService'

@observer
class ChatView extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    try {
      this.interval = pollMessagesService(this.props.homeViewStore.view.activeLiveChatId)
      .then(messages => this.props.homeViewStore.setMessages(messages))
    } catch (err) {
      console.log('chatview err: ', err)
    }
  }
  render() {
    console.log('cChatView props messages: ', this.props.homeViewStore.messages)
    const { authStore, chatStore, homeViewStore } = this.props
    const { messages } = homeViewStore
    return (
      <View style={styles.chatContainer} >
        <FlatList
         style={styles.messageList}
         data={messages}
         renderItem={data => <ChatMessage data={data} />}
         keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <View style={styles.inputContent}>
            <ChatInput
              placeholder={'placeholder'}
              autoCorrect={false}
              style={styles.inputStyle}
              value={chatStore.messageBoxInputValue}
              onChangeText={(messageText) => chatStore.setMessageBoxInputValue(messageText)}
            />
            <View style={styles.inputContainerFooterRow} >
              <ChatButton onPress={() => sendChatMessageWithYoutubeAPI(homeViewStore.view.activeLiveChatId, chatStore.messageBoxInputValue, authStore.user.accessToken)} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

class ChatButton extends Component {
  render() {
    return (
      <View style={[styles.button, {alignSelf: 'flex-end'}]}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>
              {'Send'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
class ChatMessage extends Component {
  render() {
    return (
      <View key={this.props.key} style={styles.chatMessageContainer}>
        <Text style={styles.text}>{this.props.data.item.messageText}</Text>
      </View>
    )
  }
}
const ChatInput = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.inputViewStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}
export default ChatView

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
  inputContainer: {
    flex: 1,
    height: 90,
    maxHeight: 90,
    minHeight: 90,
    minWidth: WINDOW_CONST.width,
    backgroundColor: COLORS.ORANGE,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  inputContent: {
    borderColor: COLORS.BLACK,
    borderWidth: 2,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  inputViewStyle: {
    height: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.SALMON,
    width: 50,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  buttonInner: {

  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 12,
  },
  text: {
    color: COLORS.BLACK,
    alignSelf: 'flex-start',
  },
  messageList: {
    backgroundColor: COLORS.ORANGE_SECOND,
    overflow: 'visible',
  //  borderWidth: 2,
//    height: 300,
//    maxHeight: 300,
    width: WINDOW_CONST.width,
    minWidth: WINDOW_CONST.width,
    flex: 1,
    flexDirection: 'column',
    overflow: 'scroll'
//    justifyContent: 'flex-start',
  },
  inputContainerFooterRow: {
    flex: 1,
    paddingVertical: 5,
    height: 27,
    minHeight: 27,
    maxHeight: 36,
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    backgroundColor: COLORS.ORANGE,
    height: 26,
    minHeight: 26,
    paddingVertical: 2,
  }
}
