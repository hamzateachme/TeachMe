import React, {useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

import colors from '../config/colors';
import vw from '../config/vw';
import vh from '../config/vh';

function AppImagePicker({
  imageUri,
  icon,
  onChange,
  description,
  style,
  touchable = true,
}) {
  useEffect(() => {
    getPermission();
  }, []);

  async function getPermission() {
    const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }

  async function pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        onChange(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={touchable ? pickImage : () => {}}>
      <View style={[styles.container, style]}>
        {!imageUri && (
          <MaterialCommunityIcons
            name={icon}
            size={5 * vh}
            color={colors.secondary_variant}
          />
        )}
        {!imageUri && description && (
          <Text style={{fontSize: 1.5 * vh}}>{description}</Text>
        )}
        {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 2 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30 * vw,
    width: 15 * vh,
    overflow: 'hidden',
    marginVertical: 0.5 * vh,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
export default AppImagePicker;
