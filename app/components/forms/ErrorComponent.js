import React from "react";
import { Text, StyleSheet } from "react-native";

function ErrorComponent({ error, visible }) {
  if (!visible || !error) return null;
  return (
    <Text style={styles.error} numberOfLines={3} ellipsizeMode={"tail"}>
      {error}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

export default ErrorComponent;
