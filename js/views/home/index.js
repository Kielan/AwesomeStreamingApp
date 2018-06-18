import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import MostStreamedTab from './MostStreamedTab'

@inject('authStore', 'homeViewStore', 'chatStore') @observer
class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { authStore, homeViewStore, chatStore } = this.props
    console.log('render home', homeViewStore)
    return (
      <View style={styles.container}>
      <ScrollableTabView
        style={{backgroundColor: '#E8E8E8'}}
        initialPage={1}
      >
        <MostStreamedTab
          authStore={authStore}
          homeViewStore={homeViewStore}
          chatStore={chatStore}
          tabLabel="MOST_STREAMED_TAB"
        />
      </ScrollableTabView>
      </View>
    )
  }
}
export default Home

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#343435",
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
  caption: {
    width: 300,
    height: 175,
  }
}
