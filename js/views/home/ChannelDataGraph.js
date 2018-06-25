'use strict'
import React, { Component } from 'react'
import { ART, LayoutAnimation, View, Text, } from 'react-native'
import { observer } from 'mobx-react'
import Morph from 'art/morph/path'
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
const PaddingSize = 20
const TickWidth = PaddingSize * 2
const AnimationDurationMs = 3000

@observer
export default class ChannelDataGraph extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    graphWidth: 0,
    graphHeight: 0,
    linePath: '',
  };
  static defaultProps = {
    width: Math.round(WINDOW_CONST.width * 0.9),
    height: Math.round(WINDOW_CONST.height * 0.4),
  };
  componentDidMount() {
    console.log('channeldatagraph componentDidMount', this.props)
    this.computeNextState(this.props)
  }
  componentWillReceiveProps(nextProps) {
    console.log('channeldatagraph componentwillrecieveprops', nextProps)
//    this.computeNextState(nextProps)
  }
  computeNextState(nextProps) {
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

    this.setState({
      graphWidth,
      graphHeight,
      linePath: lineGraph.path,
      ticks: lineGraph.ticks,
      scale: lineGraph.scale,
    })
    console.log('computeNextState', this.state, 'linegraph', lineGraph)

    // The first time this function is hit we need to set the initial
    // this.previousGraph value.
    if (!this.previousGraph) {
      console.log('computeNextState !this.previousGraph', lineGraph)
      this.previousGraph = lineGraph
    }
    console.log('err happening computenextstate this.props !== nextProps', this.props, 'and', nextProps)
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
      this.setState({
        // Create the ART Morph.Tween instance.
        linePath: Morph.Tween( // eslint-disable-line new-cap
          pathFrom,
          pathTo,
        ),
      }, () => {
        // Kick off our animations delcaratively and set dirty state for lifecycle check
        console.log('setState animate()', this.props)
        this.animate()
      })
      this.previousGraph = lineGraph
    }
  }
  animate(start) {
    this.animating = requestAnimationFrame((timestamp) => {
      if (!start) {
        start = timestamp
      }
      console.log('setState animate() start', start)
      // Get the delta on how far long in our animation we are.
      const delta = (timestamp - start) / AnimationDurationMs
      console.log('channeldata first delta', delta)

      // If we're above 1 then our animation should be complete.
      if (delta > 1) {
        this.animating = null
        // Just to be safe set our final value to the new graph path.
        this.setState({
          linePath: this.previousGraph.path,
        })
        return //stop our animation loop
      }
      // Tween the SVG path value according to what delta we're currently at.
      console.log('store requestAnimationFrame', delta)
      this.state.linePath.tween(delta)
      console.log('store requestAnimationFrame linePath', this.state.linePath)
      // Update our state with the new tween value and then jump back into
      // this loop.
      this.setState(this.state, () => {
        this.animate(start)
      })
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
//      ticks,
      scale = {x: {}},
    } = this.state
    const ticks = this.state.ticks || []
    console.log('channeldata render scale', scale)
    const {
      x: scaleX,
    } = scale
    const tickXFormat = scaleX.tickFormat ? scaleX.tickFormat(null, '%b %d') : 1
    console.log('channeldata render ticks', ticks, 'scaleX', scaleX)

    return (
      <View>
        <Surface width={this.props.width} height={this.props.height}>
          <Group x={100} y={0}>
            <Shape
              d={linePath}
              stroke="#000"
              strokeWidth={1}/>
          </Group>
        </Surface>

        <View key={'ticksX'}>
          {ticks != 'undefined' && ticks.length > 0 && ticks.map((tick, index) => {
            const tickStyles = {};
            tickStyles.width = TickWidth;
            tickStyles.left = tick.x - (TickWidth / 2);
            return (
              <Text key={index} style={[styles.tickLabelX, tickStyles]}>
                {tickXFormat(new Date(tick.datum.time * 1000))}
              </Text>
            );
          })}
        </View>

        <View key={'ticksY'} style={styles.ticksYContainer}>
          {ticks != 'undefined' && ticks.length > 0 && ticks.map((tick, index) => {
            const value = yAccessor(tick.datum)
            const tickStyles = {};
            tickStyles.width = TickWidth;
            tickStyles.left = tick.x - Math.round(TickWidth * 0.5)
            tickStyles.top = (tick.y + 2) - Math.round(TickWidth * 0.65)
            return (
              <View key={index} style={[styles.tickLabelY, tickStyles]}>
                <Text style={styles.tickLabelYText}>
                  {value}&deg;
                </Text>
              </View>
            );
          })}
        </View>



      </View>
    )
  }
}

const styles = {
  tickLabelX: {
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    textAlign: 'center',
  },
  ticksYContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tickLabelY: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },
  tickLabelYText: {
    fontSize: 12,
    textAlign: 'center',
  },

}
