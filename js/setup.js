import React, { Component } from 'react'
import { observer, Provider } from 'mobx-react/native'
import AppRouter from './AppRouter'
import AuthStore from './stores/AuthStore'
import HomeViewStore from './stores/HomeViewStore'
import ChatStore from './stores/ChatStore'
import GoogleSignIn from 'react-native-google-sign-in'
import { clientId } from './constants'

export default class Setup extends Component {
  async componentDidMount() {
    await this._setupGoogleSignIn()
  }
  async _setupGoogleSignIn() {
    try {
      const configPlatform = {
          clientID: clientId,
          scopes: ['profile', 'email',
         'https://www.googleapis.com/auth/youtube',
         'https://www.googleapis.com/auth/youtube.force-ssl']
      }

      await GoogleSignIn.configure({
        ...configPlatform,
      })

//      const user = await GoogleSignIn.signInPromise()
//      console.log('show user setups.js', user)
    } catch (err) {
      console.warn('Google signin error', err, err.message)
    }
  }
  render() {
    return (
      <Provider
        authStore={AuthStore}
        homeViewStore={HomeViewStore}
        chatStore={ChatStore}
      >
        <AppRouter />
      </Provider>
    )
  }
}
/*

*/
