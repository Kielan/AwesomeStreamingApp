'use strict'
import React, { Component } from 'react'
import {
  View, Text, Animated, TouchableOpacity,
} from 'react-native'
import { observer, inject } from 'mobx-react/native'

@observer
export default class DashHeadTabBar extends Component {
  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props
    const textColor = isTabActive ? activeTextColor : inactiveTextColor
    const fontWeight = isTabActive ? 'bold' : 'normal'

    return (<TouchableOpacity
      style={{flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>)
  }
  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    }

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0,  containerWidth / numberOfTabs],
    })
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
      </View>
    )
  }
}

const styles = {
  tab: {
//    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
//    paddingBottom: 10,
  },
  tabs: {
    height: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
//    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
//    borderColor: '#ccc',
  },
}
