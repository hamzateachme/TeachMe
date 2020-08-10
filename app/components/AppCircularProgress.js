import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import colors from "../config/colors";
import vh from "../config/vh";

function AppCircularProgress({
  size,
  thickness,
  currentValue,
  maxValue,
  description,
  style,
  ...otherProps
}) {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={size}
        width={thickness}
        fill={Math.round((100 * currentValue) / maxValue)}
        style={{ marginBottom: 1 * vh }}
        duration={2000}
        tintColor={colors.secondary_variant}
        backgroundColor={colors.secondary_light}
        {...otherProps}
      >
        {(fill) => <Text>{Math.round(fill)} %</Text>}
      </AnimatedCircularProgress>
      {description && (
        <Text
          style={styles.text_style}
          numberOfLines={2}
          ellipsizeMode={"tail"}
        >
          {description}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 1 * vh,
    alignItems: "center",
  },
  text_style: { fontSize: 1.25 * vh, textAlign: "center" },
});

export default AppCircularProgress;
