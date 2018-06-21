'use strict'
import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native'
import { observer } from 'mobx-react/native'
import ChannelDataGraph from './ChannelDataGraph'

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
      </View>
    )
  }
}
const styles = {
  viewContainer: {

  }
}
