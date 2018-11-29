import React, { Component } from 'react';
import {
  Animated,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  Switch,
  Easing,
  Image
} from 'react-native';

import { Icon } from 'react-native-elements';

import { BG_IMG, MAP } from 'src/constants';

import { Config } from 'src/style/config';
import Styles from './styles';
import GlobalStyles from 'src/style/global-styles';

import * as Animatable from 'react-native-animatable';

const inputToolbarProps = {
  primaryStyle: {
    marginVertical: 10,
    width: '100%',

    borderColor: '#3d3d3d',
    borderWidth: 0.6,
    borderRadius: 25,
    backgroundColor: '#fff'
  }
};

const hitSlop = {
  top: 20,
  bottom: 20,
  left: 40,
  right: 40
};

const AppBackdrop = () => (
  <Image
    source={BG_IMG}
    style={Styles.backdrop}
    resizeMode={'cover'}
  />
);

const InputBox = (props) => (
  <View
    style={[ inputToolbarProps.primaryStyle, {paddingHorizontal: 10, paddingVertical: 10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'} ]}
  >
    <TextInput
      style={{width:'100%', textAlign:'center'}}
      placeholderTextColor={Config.color.darkGrey}
      selectionColor={'grey'}
      {...props}
    />
  </View>
);

const MainButton = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[
      GlobalStyles.button
    ]}>
    <Text
      style={GlobalStyles.buttonLabel}>
      {props.label}
    </Text>
  </TouchableOpacity>
);

const LocationButton = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[GlobalStyles.innerGrid25, {width:'100%', height:'auto', paddingVertical:10, marginVertical: 10, marginBottom:15, flexDirection:'row', justifyContent:'flex-start', bbackgroundColor:'#9bc614', paddingHorizontal:15, borderRadius: 25}]} >
    <Icon
      type='entypo'
      size={18}
      color={'#fff'}
      name='location-pin' />
    <Text style={[GlobalStyles.headerSubTitle, {marginLeft:15}]}>Aisle {props.resultLocation}</Text>
  </TouchableOpacity>
);


const SearchBox = (props) => (
  <View
    style={[ inputToolbarProps.primaryStyle, {paddingHorizontal: 10, paddingVertical: 10, alignItems:'center', width:'100%'} ]}>

    <View
      style={[ {width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'} ]}
    >
      <Icon
        type='ionicon'
        size={18}
        color={'#9bc614'}
        name='ios-search'
      />
      <TextInput
        style={{flex:1, marginLeft:10}}
        placeholderTextColor={Config.color.darkGrey}
        selectionColor={'grey'}
        {...props}
        {...props.otherProps}
      />
      {
        props.value.length > 0 &&
        <Icon
          onPress={props.clearInput}
          type='ionicon'
          size={18}
          color={'#4c4a4a'}
          name='ios-close-circle'
        />
      }

    </View>
    <FlatList
      keyboardShouldPersistTaps={'always'}
      style={{width:'100%', paddingLeft: 25, maxHeight: 200 }}
      data={props.suggestions}
      keyExtractor={item => item.sku.toString()}
      renderItem={ ({item, index}) =>
        <TouchableOpacity
          onPress={() => props.onSelect(item)}
          style={{width:'100%', paddingVertical:10}}>
          <Text style={[GlobalStyles.suggestionsLabel]}>{item.product}</Text>
        </TouchableOpacity>
      }
    />
  </View>
);

class Pin extends Component {
  constructor(props) {
    super(props);
    this.opacityVal = new Animated.Value(0);
  }

  componentDidMount() {
    this.animateTo(1);
  }

  animateTo = (toValue) => {
    this.animate = Animated.timing(
      this.opacityVal,
      {
        toValue,
        duration: 1000,
        easing: Easing.linear
      }
    );

    this.animate.start( () => {
      this.animateTo(toValue === 1 ? 0 : 1);
    });
  }

  render = () => (
    <Animated.View style={{position: 'absolute', left:120, top: 100, opacity: this.opacityVal}}>
      <Icon
        type='entypo'
        size={35}
        color={'#ff0000'}
        name='location-pin' />
    </Animated.View>
  );
}

const MapView = (props) => (
  <View style={{width:'100%', height: 280, backgroundColor:'#19557999', position:'absolute', bottom: props.show ? 0 : -300, justifyContent: 'flex-start'}}>
    <Image
      source={MAP}
      style={[ Styles.backdrop, {opacity: 0.8, width:'100%', height: 280} ]}
      resizeMode={'cover'}
    />
    <View
      style={{width:'100%', height: 280, position:'absolute'}}>

      <Pin />

      <View style={{position: 'absolute', right:120, bottom: 30}}>
        <Icon
          type='entypo'
          size={25}
          color={'#000'}
          name='man' />
      </View>


    </View>

    <View style={{position:'absolute', width: '100%', alignItems:'flex-end'}}>
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={props.onClose}
        style={{width:30, height:30, backgroundColor:'#00476c', borderRadius:30/2, alignItems:'center', justifyContent:'center', margin:10}}>
        <Icon
          type='ionicon'
          size={18}
          color={'#fff'}
          name='md-close' />
      </TouchableOpacity>

    </View>
  </View>
);


export {
  AppBackdrop,
  InputBox,
  MainButton,
  LocationButton,
  SearchBox,
  MapView
};
