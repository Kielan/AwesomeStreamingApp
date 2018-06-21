'use strict'
import React, { Component } from 'react'
import {
  View, Text,
} from 'react-native'
import { GoogleSignInButton } from './buttons'//      <GoogleSigninButton />
import { observer, inject } from 'mobx-react/native'

@inject('authStore') @observer
class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Login!</Text>
        <GoogleSignInButton {...this.props.authStore} />
      </View>
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
    backgroundColor: "#343435",
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  }
}

export default Login
