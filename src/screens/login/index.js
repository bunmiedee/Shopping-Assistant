import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
  Image,
  Platform,
  LayoutAnimation,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux';

import GlobalStyles from 'src/style/global-styles';

import { LOGO } from 'src/constants';
import { LOGIN_SUCCESS } from 'src/actions/auth/constants';

import * as AuthService from 'api/auth-service';

import { Constants, Svg } from 'expo';

import {
  AppBackdrop,
  InputBox,
  MainButton
} from 'src/components/commons';


class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.doLogin();
  }

  async doLogin() {
    const { onLoginSuccess } = this.props;
    const data = await AuthService.login({
      username: 'bunmiedee',
      password: 'st2016'
    });

    const {
      result: {
        [0]: {
          token,
          user: { _id: userId, username }
        }
      }
    } = data;

    token && onLoginSuccess({token, username, userId});
  }

  render() {

    return (
      <View style={[GlobalStyles.mainContainer, {backgroundColor:'#000'}]}>
        <AppBackdrop />
          <View style={{position: 'absolute', top:'20%'}}>
            <Image
              source={LOGO}
              style={{width:146, height:26}}
            />
          </View>

          <View style={{width: '80%', padding: 10, alignItems: 'center'}}>
            <InputBox
              placeholder={'Username'}
              />

            <InputBox
              placeholder={'Password'}
              secureTextEntry={true}
              />

            <MainButton
              label={'Sign in'}
              />

          </View>
          
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});


const bindActions = dispatch => ({
  onLoginSuccess(data) {
    dispatch({type: LOGIN_SUCCESS, data});
  }
});


export default connect( null, bindActions )( Login );
