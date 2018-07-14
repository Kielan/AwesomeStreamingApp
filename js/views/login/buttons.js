'use strict'
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer, inject } from 'mobx-react'
import { COLORS, WINDOW_CONST } from '../../constants'
import AuthStore from '../../stores/AuthStore'
import HomeViewStore from '../../stores/HomeViewStore'

const styles = {
  button: {
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: WINDOW_CONST.height / 2,
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
        <View style={[styles.button, {backgroundColor: COLORS.ORANGE_THIRD}]}>
          <Text style={[styles.text, {color: 'white'}]}>
            Log in with Google
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
