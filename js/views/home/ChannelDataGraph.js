'use strict'
import React, { Component } from 'react'
import { ART, LayoutAnimation, View, } from 'react-native'
import { observer } from 'mobx-react/native'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as d3Array from 'd3-array'
import * as graphUtils from '../../services/d3Service'
import { WINDOW_CONST } from '../../constants'
const d3 = {
  scale,
  shape,
}
const {
  Surface,
  Group,
  Shape,
} = ART

const AnimationDurationMs = 500

@observer
export default class ChannelDataGraph extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    width: Math.round(WINDOW_CONST.width * 0.9),
    height: Math.round(WINDOW_CONST.height * 0.5),
  };
  state = {
    graphWidth: 0,
    graphHeight: 0,
    linePath: '',
  }
  componentWillMount() {
    const { dataViewStore } = this.props
    const previousGraph = dataViewStore.computeNextState(this.props, this)
    this.animate(dataViewStore.previousGraph)
  }
  componentWillReceiveProps(nextProps) {
    const { dataViewStore } = this.props
    dataViewStore.computeNextState(nextProps, this)
    this.animate(dataViewStore.previousGraph)
  }
  // This is where we animate our d3 graph path value.
  animate(previousGraph, start) {
    const { dataViewStore } = this.props
    dataViewStore.animating = requestAnimationFrame((timestamp) => {
      if (!start) {
        // eslint-disable-next-line no-param-reassign
        start = timestamp
      }
      // Get the delta on how far long in our animation we are.
      const delta = (timestamp - start) / AnimationDurationMs

      // If we're above 1 then our animation should be complete.
      if (delta > 1) {
        dataViewStore.animating = null
        // Just to be safe set our final value to the new graph path.
        dataViewStore.setStore({
          linePath: previousGraph.path,
        })
        return //stop our animation loop
      }
      // Tween the SVG path value according to what delta we're currently at.
      dataViewStore.state.linePath.tween(delta)
      // Update our state with the new tween value and then jump back into
      // this loop.
      dataViewStore.setStore(dataViewStore.state)
  //    this.animate(false, start)
    })
  }
  render() {
    const {
      yAccessor,
      dataViewStore,
    } = this.props
    const {
      graphWidth,
      graphHeight,
      linePath,
      ticks,
      scale,
    } = dataViewStore.state
//    const {
//      x: scaleX,
//    } = scale
  console.log('ChannelDataGraph render', linePath)
    return (
      <View>
        <Surface width={500} height={500}>
          <Group x={100} y={0}>
            <Shape
              d={linePath}
              stroke="#000"
              strokeWidth={1}/>
          </Group>
        </Surface>
      </View>
    )
  }
}
