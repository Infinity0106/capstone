import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

type HeroProps = {};

export const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#F4CE14", fontFamily: "Markazi", fontSize: 64 }}>
        Little Lemon
      </Text>
      <View style={styles.rowContainer}>
        <View style={styles.left}>
          <Text style={{ fontFamily: "Markazi", fontSize: 32, color: "white" }}>
            Chicago
          </Text>
          <Text style={{ fontFamily: "Karla", color: "white", fontSize: 16 }}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>
        <View style={styles.right}>
          <Image
            style={styles.profileImg}
            source={require("../assets/Hero.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: 256,
    backgroundColor: "#495E57",
  },
  left: {
    flex: 10,
    flexGrow: 1,
  },
  right: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
    flexGrow: 1,
  },
  profileImg: {
    height: 128,
    width: 128,
    borderRadius: 10,
  },
});
