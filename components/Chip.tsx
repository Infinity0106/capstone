import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

type ChipProps = {
  title: string;
  onPress: (title: string) => void;
  active: boolean;
};
export const Chip: React.FC<ChipProps> = ({ title, onPress, active }) => {
  return (
    <Pressable
      style={[styles.container, active && styles.activeBg]}
      onPress={() => onPress(title)}
    >
      <Text style={[styles.title, active && styles.activeTxt]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDEFEE",
    padding: 10,
    borderRadius: 10,
    flexGrow: 0,
    flexShrink: 1,
    marginRight: 12,
  },
  title: { color: "#495E57", fontWeight: "600" },
  activeBg: { backgroundColor: "#495E57" },
  activeTxt: { color: "white" },
});
