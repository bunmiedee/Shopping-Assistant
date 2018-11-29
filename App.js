import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { Font } from 'expo';

import store from './src/store';
import ItemFinder from './item-finder';

import { FONTS } from 'src/constants';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    await Font.loadAsync(FONTS);
    this.setState({ isReady: true });
  }

  render() {
    const { isReady } = this.state;
    return (
      !isReady ?
      <Expo.AppLoading /> :
      <Provider store={store}>
        <ItemFinder />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
