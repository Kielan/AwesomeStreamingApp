'use strict'
import React, { Component } from 'react'
import { View, WebView} from 'react-native'
import Video from 'react-native-video'
import YouTube from 'react-native-youtube'
import { callPlayer, parseStartTime } from '../../services/videoPlayerService'
import { WINDOW_CONST, GOOGLE_KEY } from '../../constants'
import { MediaPlayer } from '../components/MediaPlayer/MediaPlayer'

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'cover',
      duration: 0.0,
      currentTime: 0.0,
      size: this.props.size,
      orientation: 'PORTRAIT',//this.props.orientation,
      paused: false,//this.props.paused,
    }
  }
  componentWillReceiveProps(nextProps) {
    let newVideoSize={width:WINDOW_CONST.width, height: (WINDOW_CONST.height*(9/16))}
    this.setState({
      size: newVideoSize,
      orientation: 'PORTRAIT',//nextProps.orientation
    })
  }
  onProgress = (data) => {
    this.setState({currentTime: data.currentTime})
  }
  ref = container => {
    this.container = container
  }
  render() {
    ////'https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0&autoplay=0&showinfo=0&controls=0'}}
    return (
      <View style={[styles.videoPlayerContainer, this.state.size]}>
        {/*<Video
          source={{uri: this.props.video}}
          style={styles.fullScreen}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          resizeMode={this.state.resizeMode}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={() => { /*console.log('Done!')*/ }}
          repeat={true}
          ref={'videoplayer'}
        />*/}
        {/*<WebView
          style={styles.fullScreen}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          source={{uri: this.props.video}}
          mediaPlaybackRequiresUserAction={false}
          scrollEnabled={false}
          startInLoadingState={true}
        />*/}
        {/*<YouTube
          apiKey={GOOGLE_KEY}
          videoId={this.props.video}
          play={true}
          />*/}
        <MediaPlayer
          url={this.props.video}
        />
      </View>
    )
  }
}

const styles = {
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    minWidth: WINDOW_CONST.width,
    minHeight: (WINDOW_CONST.height*(9/16)),
//    backgroundColor: 'green',
    zIndex: 8,
    flex: 1,
  },
  videoPlayerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: WINDOW_CONST.width,
    height: (WINDOW_CONST.height*(9/16)),
    zIndex: 9,
    backgroundColor: 'blue',
  },
}
