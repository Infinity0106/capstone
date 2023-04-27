import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";

type HeaderProps = {
  profile?: boolean;
  backArrow?: boolean;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};
export const Header: React.FC<HeaderProps> = ({
  backArrow = false,
  profile = false,
  onLeftPress,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.left} onPress={onLeftPress}>
        {backArrow && (
          <Image
            style={styles.backImg}
            source={require("../assets/Back.png")}
          />
        )}
      </Pressable>
      <View style={styles.center}>
        <Image style={styles.logoImg} source={require("../assets/Logo.png")} />
      </View>
      <Pressable style={styles.right} onPress={onRightPress}>
        {profile && (
          <Image
            style={styles.profileImg}
            source={require("../assets/Profile.png")}
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  left: {
    flexBasis: 100,
    flexShrink: 0,
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flexBasis: "auto",
    flexShrink: 0,
    flexGrow: 1,
  },
  right: {
    flexBasis: 100,
    flexShrink: 0,
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImg: {
    height: 40,
    width: 185,
  },
  profileImg: {
    height: 48,
    width: 48,
  },
  backImg: {
    height: 48,
    width: 48,
  },
});
