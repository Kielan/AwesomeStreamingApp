'use strict'
import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { LINE_GRAPH_DATA } from '../../constants'
import MostStreamedTab from './MostStreamedTab'
import AnalyticsTab from './AnalyticsTab'
import DashHeadTabBar from './DashHeadTabBar'

@inject('authStore', 'dataViewStore', 'homeViewStore', 'chatStore') @observer
class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { authStore, dataViewStore, homeViewStore, chatStore } = this.props
    const chartData =
    console.log('render home', homeViewStore)
    return (
      <View style={styles.container}>
      <ScrollableTabView
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
