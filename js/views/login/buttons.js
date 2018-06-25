'use strict'
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer, inject } from 'mobx-react'
import AuthStore from '../../stores/AuthStore'
import HomeViewStore from '../../stores/HomeViewStore'

const styles = {
  button: {
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 15,
  },
  text: {
    fontSize: 13,
  },
};


@observer
export class GoogleSignInButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('render this.props for authStore', this.props)
    return (
      <TouchableOpacity onPress={() => AuthStore.signInWithGoogle()}>
        <View style={[styles.button, {backgroundColor: 'white'}]}>
          <Text style={[styles.text, {color: 'black'}]}>
            Log in with Google
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
