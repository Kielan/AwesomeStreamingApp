'use strict'
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { YoutubePlayer } from './YoutubePlayer'
import { defaultProps, getConfig } from '../../../services/videoPlayerService'
//config = getConfig(this.props, defaultProps, true)
export class MediaPlayer extends Component {
  componentDidMount () {

  }
  componentWillUpdate (nextProps) {
    //this.config = getConfig(nextProps, defaultProps)
  }
  activePlayerRef = player => {
    this.player = player
  }
  render() {
    return (
      <View><Text>END</Text>
      {<YoutubePlayer
        {...this.props}
        ref={this.activePlayerRef}
        config={this.config}
        onReady={this.onReady}
      />}
      </View>
    )
  }
}

/*
getDuration () {
  if (!this.isReady) return null
  return this.player.getDuration()
}
seekTo (amount) {
  // When seeking before player is ready, store value and seek later
  if (!this.isReady && amount !== 0) {
    this.seekOnPlay = amount
    setTimeout(() => {
      this.seekOnPlay = null
    }, SEEK_ON_PLAY_EXPIRY)
    return
  }
  if (amount > 0 && amount < 1) {
    // Convert fraction to seconds based on duration
    const duration = this.player.getDuration()
    if (!duration) {
      console.warn('ReactPlayer: could not seek using fraction – duration not yet available')
      return
    }
    this.player.seekTo(duration * amount)
    return
  }
  this.player.seekTo(amount)
}
onReady = () => {
  if (!this.mounted) return
  this.isReady = true
  this.isLoading = false
  const { onReady, playing, volume, muted } = this.props
  onReady()
  if (muted || volume !== null) {
    this.player.setVolume(muted ? 0 : volume)
  }
  if (playing) {
    this.player.play()
  }
  this.onDurationCheck()
}
onPlay = () => {
  this.isPlaying = true
  this.isLoading = false
  const { onStart, onPlay, playbackRate } = this.props
  if (this.startOnPlay) {
    if (this.player.setPlaybackRate) {
      this.player.setPlaybackRate(playbackRate)
    }
    onStart()
    this.startOnPlay = false
  }
  onPlay()
  if (this.seekOnPlay) {
    this.seekTo(this.seekOnPlay)
    this.seekOnPlay = null
  }
  this.onDurationCheck()
}
onPause = (e) => {
  this.isPlaying = false
  if (!this.isLoading) {
    this.props.onPause(e)
  }
}
onEnded = () => {
  const { activePlayer, loop, onEnded } = this.props
  if (activePlayer.loopOnEnded && loop) {
    this.seekTo(0)
  }
  if (!loop) {
    this.isPlaying = false
  }
  onEnded()
}
onDurationCheck = () => {
  clearTimeout(this.durationCheckTimeout)
  const duration = this.getDuration()
  if (duration) {
    if (!this.onDurationCalled) {
      this.props.onDuration(duration)
      this.onDurationCalled = true
    }
  } else {
    this.durationCheckTimeout = setTimeout(this.onDurationCheck, 100)
  }
}
*/
