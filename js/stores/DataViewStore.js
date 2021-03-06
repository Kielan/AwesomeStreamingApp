'use strict'
import { LayoutAnimation } from 'react-native'
import { action, observable, computed } from 'mobx'
import Morph from 'art/morph/path'
import * as graphUtils from '../services/d3Service'

const PaddingSize = 20
const TickWidth = PaddingSize * 2
const AnimationDurationMs = 3000

class DataViewStore {
  @observable previousGraph = false
  @observable animating = false
  @observable state = {
    graphWidth: 0,
    graphHeight: 0,
    linePath: '',
  }
  @observable graphData = {
    messagesActivity: [],
    activityPeak: 0,
    activityFloor: 0,
  }
  @action setStore(key, value) {
    this[key] = { ...value }
  }

}

export default new DataViewStore()
