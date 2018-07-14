'use strict'
import React, { Component } from 'react'
import {
  View, Text,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { GoogleSignInButton } from './buttons'//      <GoogleSigninButton />
import { observer, inject } from 'mobx-react'
import { COLORS } from '../../constants'

@inject('authStore') @observer
class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <LinearGradient  colors={[COLORS.ORANGE_FOURTH, COLORS.ORANGE_THIRD, COLORS.ORANGE_SECOND, COLORS.ORANGE]} style={styles.container}>
        <GoogleSignInButton {...this.props.authStore} />
      </LinearGradient>
    )
  }
}
/*
<Container>
<Content
  keyboardShouldPersistTaps="always"
  contentContainerStyle={{ flex: 1 }}
>
</Content>
</Container>

*/

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.ORANGE_THIRD,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  }
}

export default Login
