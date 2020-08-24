import React, {useContext} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';

import AppCircularProgress from '../components/AppCircularProgress';
import colors from '../config/colors';
import UserContext from '../hooks/UserContext';
import vh from '../config/vh';
import vw from '../config/vw';

function GoalsCard(props) {
  const {user} = useContext(UserContext);
  let badge;
  if (user.status === 'gold') {
    badge = require('../assets/gold.jpg');
  } else if (user.status === 'silver') {
    badge = require('../assets/silver.jpg');
  } else {
    badge = require('../assets/bronze.jpg');
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.image_container}>
        <Image source={badge} style={styles.image} />
        <StarRating
          disable={false}
          maxStars={5}
          rating={user.rating}
          fullStarColor={colors.gold}
          starSize={8 * vw}
        />
        <Text>
          {user.status.toUpperCase()} {user.accountType.toUpperCase()}
        </Text>
      </View>
      <View style={styles.goals_container}>
        <AppCircularProgress
          size={13.25 * vh}
          width={1.25 * vh}
          currentValue={65}
          maxValue={200}
          description={'GOALS COMING SOON'}
        />
        <AppCircularProgress
          size={13.25 * vh}
          width={1.25 * vh}
          currentValue={800}
          maxValue={1000}
          description={'GOALS COMING SOON'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40 * vh,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 2 * vh,
    padding: 2 * vh,
    marginBottom: vh,
    overflow: 'hidden',
  },
  goals_container: {
    flex: 2,
  },
  image_container: {
    flex: 3,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    flex: 5,
    width: '100%',
    height: 30 * vh,
  },
});
export default GoalsCard;
