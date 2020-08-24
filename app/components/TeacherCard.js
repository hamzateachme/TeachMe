import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import StarRating from 'react-native-star-rating';
import colors from '../config/colors';

function TeacherCard(props) {
  return (
    <View style={styles.container}>
      <Image
        source={props.profile_picture}
        style={styles.profile_picture}></Image>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.subjects}>{props.subjects}</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={props.rating}
        fullStarColor="#FFD700"
        starSize={30}
        containerStyle={styles.star}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingBottom: 10,
    overflow: 'hidden',
  },

  profile_picture: {
    width: '100%',
    height: 150,
    resizeMode: 'stretch',
  },

  name: {
    width: '100%',
    textAlignVertical: 'center',
    fontSize: 25,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: colors.secondary,
  },

  subjects: {
    width: '100%',
    textAlignVertical: 'center',
    fontSize: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: colors.black,
  },

  star: {
    width: '100%',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default TeacherCard;
