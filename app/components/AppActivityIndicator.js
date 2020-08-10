import React from 'react';
import LottieView from 'lottie-react-native';
import vh from '../config/vh';
import vw from '../config/vw';
import {View} from 'react-native';

function AppActivityIndicator({visible = false, style}) {
  if (!visible) return null;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animations/loading_teacher.json')}
        style={[
          {
            width: 50 * vw,
          },
          style,
        ]}
      />
    </View>
  );
}

export default AppActivityIndicator;
