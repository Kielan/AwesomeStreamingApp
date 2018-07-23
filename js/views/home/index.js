'use strict'
import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native'
import { observer, inject } from 'mobx-react'
import { action, runInAction, toJS } from 'mobx'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { LINE_GRAPH_DATA } from '../../constants'
import { pollMessagesService, liveChatStepThroughPageTokens } from '../../services/chatService'
import { createLiveStreamChannelActivityOverview } from '../../services/d3Service'
import MostStreamedTab from './MostStreamedTab'
import AnalyticsTab from './AnalyticsTab'
import DashHeadTabBar from './DashHeadTabBar'

@inject('authStore', 'dataViewStore', 'homeViewStore', 'chatStore') @observer
class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
      const { homeViewStore } = this.props
      console.log('homeWillReceiveProps...')
      homeViewStore.initPollService()
      homeViewStore.loadMediaPlayer()
//      let wholePageProps = await liveChatStepThroughPageTokens(this.props.homeViewStore.view.activeLiveChatId)
//      console.log('homeWillReceiveProps: ', wholePageProps)
//      this.interval = await homeViewStore.initPollService()//pollMessagesService(this.props.homeViewStore.view.activeLiveChatId)
//      .then(action(messages => this.props.homeViewStore.liveChatData.messagesList.set(messages)))
//      .then((messages => this.props.homeViewStore.liveChatData.messagesList))
//      if (Array.isArray(toJS(this.props.homeViewStore.messagesLowercase)) && toJS(this.props.homeViewStore.messagesLowercase).length ) {
        //      console.log('render home', createLiveStreamChannelActivityOverview(toJS(homeViewStore.messagesLowercase)))
//        let activityOveviewData = createLiveStreamChannelActivityOverview(toJS(this.props.homeViewStore.messagesLowercase))
//        this.props.dataViewStore.setStore('graphData', activityOveviewData)

//      }
  }
  componentWillUnmount() {
    homeViewStore.disposePollService()
  }
  render() {
    const { authStore, dataViewStore, homeViewStore, chatStore } = this.props

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
          data={dataViewStore.graphData}
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
