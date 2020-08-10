import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";
import vh from "../config/vh";

function ListSeparator(props) {
  return <View style={styles.styler} />;
}

const styles = StyleSheet.create({
  styler: {
    width: "100%",
    height: 0.25 * vh,
    backgroundColor: colors.primary,
  },
});

export default ListSeparator;
