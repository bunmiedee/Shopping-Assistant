import { StyleSheet, Dimensions } from 'react-native';

import {
  getStatusBarHeight,
  getBottomSpace
} from 'react-native-iphone-x-helper';

const { width, height } = Dimensions.get('window');

import { Config } from 'src/style/config';

export default StyleSheet.create({

  mainContainer: {
    alignItems:'center',
    height:'100%',
    width:'100%'
  },

  headerContainer: {
    paddingTop: getStatusBarHeight()
  },

  button: {
    backgroundColor: Config.color.blue,
    marginVertical: 10,
    width: '100%',
    height: 45,
    borderRadius: 25,
    alignItems:'center',
    justifyContent: 'center'
  },

  buttonLabel: {
    color: Config.color.white,
    fontSize: Config.font.size.medium,
    fontFamily: Config.font.family.regular
  },

  headerTitle: {
    color: Config.color.white,
    fontSize: Config.font.size.xlarge,
    fontFamily: Config.font.family.light,
    marginVertical: 1
  },

  headerSubTitle: {
    color: Config.color.white,
    fontSize: Config.font.size.large,
    fontFamily: Config.font.family.light,
    marginVertical: 1
  },

  headerLabel: {
    color: Config.color.white,
    fontSize: Config.font.size.small,
    fontFamily: Config.font.family.regular,
    letterSpacing: 0.4,
    marginVertical: 1,
    opacity:0.9
  },

  suggestionsLabel: {
    //color: Config.color.white,
    fontSize: 12,
    fontFamily: Config.font.family.regular,
    letterSpacing: 0.4,
    marginVertical: 1,
    opacity:0.9
  },

  headerText: {
    color: Config.color.white,
    fontSize: Config.font.size.normal,
    fontFamily: Config.font.family.normal,
    letterSpacing: 0.6,
    marginVertical: 1,
    opacity:0.75
  },

  variableHeaderLabel: {
    color: Config.color.white,
    fontSize: Config.font.size.small,
    fontFamily: Config.font.family.bold,
    letterSpacing: 0.6,
    marginVertical: 1,
    opacity:0.9
  },

  subHeader: {
    color: Config.color.white,
    fontSize: Config.font.size.small,
    fontFamily: Config.font.family.Semibold,
    letterSpacing: 0.6,
    marginVertical: 1,
    opacity:0.9
  },

  badgeLabel: {
    color: Config.color.white,
    fontSize: Config.font.size.small,
    fontFamily: Config.font.family.Semibold,
    letterSpacing: 0.6,
    marginVertical: 1
  },

  variableValueSmall: {
    color: Config.color.white,
    fontSize: Config.font.size.medium,
    fontFamily: Config.font.family.light,
    letterSpacing: 0.6,
  },

  deltaValue: {
    color: Config.color.white,
    fontSize: 12,
    fontFamily: Config.font.family.regular,
    letterSpacing: 0.7,
  },

  grid25: {
    width:'25%',
    height:'100%',
    backgroundColor:'#00476c00',
    alignItems: 'center',
    justifyContent:'flex-end',
  },

  grid75: {
    width:'75%',
    height:'100%',
    backgroundColor:'#003a5800'
  },

  innerGrid25: {
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#002031',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#00476c', //'#005380',
    backgroundColor: '#006093', //'#005380',
  },

  relatedItem: {
    width:'100%',
    paddingVertical: 10,
    paddingHorizontal:5,
    paddingLeft: 25,
    paddingBottom: 0,
    //backgroundColor:"#006093",
    marginBottom: 1
  }

});
