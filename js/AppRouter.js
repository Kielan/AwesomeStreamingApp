'use strict'
import React, { Component } from 'react'
import {
  View, Text,
} from 'react-native'
import { Router, Scene, Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react/native'
import AuthStore from './stores/AuthStore'
import Login from './views/login'
import Home from './views/home'
////    <Scene key="home" component={Home} />
const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} hideNavBar initial={!(AuthStore.isLoggedIn)} />
    <Scene key="home" drawer={true} hideNavBar={true} headerMode={"float"} component={Home} />
  </Scene>
)
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
  }
}
@observer
class AppRouter extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('appRouter render')
    return (
      <Router scenes={scenes} />
    )
  }
}

export default AppRouter
//      <Router scenes={scenes} />

//https://www.googleapis.com/youtube/v3/search/?part=snippet&chart=mostPopular&eventType=live&type=video&key=AIzaSyApA9jYGrEZ2pLzaI8svf59luLHXMCNmZk
