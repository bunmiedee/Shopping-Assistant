import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

  backdrop: {
    width,
    height,
    position: 'absolute',
    opacity: 0.4
  }

});
