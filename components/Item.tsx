import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

// const Bruschetta = require("../assets/bruschetta.jpg");
// const GreekSalad = require("../assets/greekSalad.jpg");
// const GrilledFish = require("../assets/grilledFish.jpg");
// const LemonDessert = require("../assets/lemonDessert.jpg");
// const Pasta = require("../assets/pasta.jpg");

// const IMG_MAP = {
//   "bruschetta.jpg": Bruschetta,
//   "greekSalad.jpg": GreekSalad,
//   "grilledFish.jpg": GrilledFish,
//   "lemonDessert.jpg": LemonDessert,
//   "pasta.jpg": Pasta,
// };

type ItemProps = {
  title: string;
  desc: string;
  price: string;
  // img: keyof typeof IMG_MAP;
  img: string;
};
export const Item: React.FC<ItemProps> = ({
  title,
  desc,
  price,
  img = "greekSalad.jpg",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <View style={styles.right}>
        <Image
          style={styles.img}
          source={{
            uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${img}?raw=true`,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#EDEFEE",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  left: {
    flexBasis: "auto",
    flexShrink: 1,
    flexGrow: 1,
  },
  right: {
    width: 64,
    flexBasis: "auto",
    flexShrink: 0,
    flexGrow: 0,
    justifyContent: "center",
  },
  img: {
    width: 64,
    height: 64,
  },
  price: { color: "#495E57", fontWeight: "600" },
  desc: {
    color: "#495E57",
    marginVertical: 6,
  },
  title: { fontWeight: "600" },
});
