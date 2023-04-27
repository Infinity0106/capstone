import React from "react";
import { StyleSheet, Image, SafeAreaView } from "react-native";

export const Splash: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logoImg} source={require("../assets/Logo.png")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImg: {
    height: 40,
    width: 185,
  },
});
