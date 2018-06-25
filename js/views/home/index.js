'use strict'
import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { LINE_GRAPH_DATA } from '../../constants'
import { pollMessagesService } from '../../services/chatService'
import MostStreamedTab from './MostStreamedTab'
import AnalyticsTab from './AnalyticsTab'
import DashHeadTabBar from './DashHeadTabBar'

@inject('authStore', 'dataViewStore', 'homeViewStore', 'chatStore') @observer
class Home extends Component {
  constructor(props) {
    super(props)
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
    const { authStore, dataViewStore, homeViewStore, chatStore } = this.props
    console.log('render home', homeViewStore)
    return (
      <View style={styles.container}>
      { homeViewStore.view.viewLoaded === true && <ScrollableTabView
        renderTabBar={() => <DashHeadTabBar />}
        style={{backgroundColor: '#E8E8E8'}}
        initialPage={1}
      >
        <MostStreamedTab
          authStore={authStore}
          homeViewStore={homeViewStore}
          chatStore={chatStore}
          tabLabel="MOST_STREAMED_TAB"
        />
        <AnalyticsTab
          authStore={authStore}
          dataViewStore={dataViewStore}
          homeViewStore={homeViewStore}
          chatStore={chatStore}
          data={LINE_GRAPH_DATA}
          tabLabel="ANALYTICS_TAB"
        />
      </ScrollableTabView> }
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
