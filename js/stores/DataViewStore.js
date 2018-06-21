'use strict'
import { action, observable, computed } from 'mobx'
import { LayoutAnimation } from 'react-native'
import Morph from 'art/morph/path'
import * as graphUtils from '../services/d3Service'

const PaddingSize = 20
const TickWidth = PaddingSize * 2
const AnimationDurationMs = 500

class DataViewStore {
  previousGraph = false
  @observable animating = false
  @observable state = {
    graphWidth: 0,
    graphHeight: 0,
    linePath: '',
  }
  @action setStore(value) {
    this.state = { ...value }
  }
  computeNextState(nextProps, viewLevelScope) {
    const {
      data,
      width,
      height,
      xAccessor,
      yAccessor,
    } = nextProps
    const fullPaddingSize = PaddingSize * 2
    const graphWidth = width - fullPaddingSize
    const graphHeight = height - fullPaddingSize
    const lineGraph = graphUtils.createLineGraph({
      data,
      xAccessor,
      yAccessor,
      width: graphWidth,
      height: graphHeight,
    })

    this.setStore({
      graphWidth,
      graphHeight,
      linePath: lineGraph.path,
      ticks: lineGraph.ticks,
      scale: lineGraph.scale,
    })

    // The first time this function is hit we need to set the initial
    // this.previousGraph value.
    if (!this.previousGraph) {
      this.previousGraph = lineGraph
    }
    // Only animate if our properties change. Typically this is when our
    // yAccessor function changes.
    if (this.props !== nextProps) {
      const pathFrom = this.previousGraph.path
      const pathTo = lineGraph.path
      cancelAnimationFrame(this.animating)
      this.animating = null
      // Opt-into layout animations so our y tickLabel's animate.
      // If we wanted more discrete control over their animation behavior
      // we could use the Animated component from React Native, however this
      // was a nice shortcut to get the same effect.
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          AnimationDurationMs,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity,
        )
      )
      this.setStore({
        // Create the ART Morph.Tween instance.
        linePath: Morph.Tween( // eslint-disable-line new-cap
          pathFrom,
          pathTo,
        ),
      })
      // Kick off our animations!
      this.previousGraph = lineGraph
    }
  }
}

export default new DataViewStore()
