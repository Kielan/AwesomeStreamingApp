'use strict'
import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, Image, TextInput,
} from 'react-native'
import { observer } from 'mobx-react/native'
import { WINDOW_CONST, COLORS } from '../../constants'
import ChannelDataGraph from './ChannelDataGraph'
import MessagesResults from './MessagesResults'
import ChatMessage from './ChatMessage'

@observer
export default class AnalyticsTab extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { authStore, dataViewStore, homeViewStore, chatStore, data: graphData, } = this.props
    const showMax = true
    const graphProps = {}
          graphProps.data = graphData.daily.data
          graphProps.xAccessor = d => new Date(d.time * 1000)
          if (showMax) {
            graphProps.yAccessor = d => d.temperatureMax
          } else {
            graphProps.yAccessor = d => d.temperatureMin
          }

    return (
      <View style={styles.viewContainer}>
        <ChannelDataGraph dataViewStore={dataViewStore} {...graphProps} />
        <TextInput
          placeholder={'placeholder'}
          autoCorrect={false}
          style={styles.inputStyle}
          value={homeViewStore.analyticsTab.messagesSearchValue}
          onChangeText={homeViewStore.messagesSearch}
        />
        <MessagesResults data={homeViewStore.chatArchiveQuery} filter={homeViewStore.analyticsTab.messagesSearchValue} />
      </View>
    )
  }
}
const styles = {
  viewContainer: {
    flex: 1,
    height: WINDOW_CONST.height,
  },
  inputStyle: {
    flex: 1,
    height: 26,
    minHeight: 26,
    maxHeight: 26,
    paddingVertical: 2,
    backgroundColor: 'blue',
  }
}
