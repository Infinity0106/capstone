import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

type ButtonProps = {
  children: string;
  onPress: () => void;
  disabled?: boolean;
};
export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled,
}) => {
  return (
    <Pressable
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    backgroundColor: "#F4CE14",
    borderRadius: 12,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  label: { fontFamily: "Karla", fontSize: 24 },
  disabled: {
    backgroundColor: "#dfdfdf",
  },
});
