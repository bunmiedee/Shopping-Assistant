import React  from 'react';

import { connect } from 'react-redux'
import {
  Scene,
  Modal,
  Actions,
  Stack,
  Route,
  Router
} from 'react-native-router-flux';

const ConnectedRouter = connect()(Router);

import Home from 'src/screens/home';

const AppScenes = Actions.create(
  <Stack key='root'
    modal
    hideNavBar>

    <Scene
      key='auth'
      component={Home}
      hideNavBar
      hideTabBar
    />


  </Stack>
);


const ItemFinder = () => <ConnectedRouter scenes={AppScenes} scheme="ItemFinder" />

export default ItemFinder;
