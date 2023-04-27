import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
