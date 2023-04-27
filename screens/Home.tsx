import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Chip } from "../components/Chip";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Item } from "../components/Item";
import { HomeStackProps, MenuItem } from "../types";
import {
  createTable,
  filterByQueryAndCategories,
  getCategories,
  getMenuItems,
  saveMenuItems,
} from "../database";
import { useDebounce, useUpdateEffect } from "../useDebounce";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const fetchData = async () => {
  // 1. Implement this function

  // Fetch the menu from the API_URL endpoint. You can visit the API_URL in your browser to inspect the data returned
  // The category field comes as an object with a property called "title". You just need to get the title value and set it under the key "category".
  // So the server response should be slighly transformed in this function (hint: map function) to flatten out each menu item in the array,
  try {
    const res = await fetch(API_URL);
    const resJson = await res.json();
    return resJson.menu;
  } catch (e) {
    Alert.alert(e.message);
  }
  return [];
};

export const Home: React.FC = () => {
  const navigation = useNavigation<HomeStackProps>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");

  const [sections, setSection] = useState<MenuItem["category"][]>([]);
  const [filteredSections, setFilteredSection] = useState<
    MenuItem["category"][]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();

        // The application only fetches the menu data once from a remote URL
        // and then stores it into a SQLite database.
        // After that, every application restart loads the menu from the database
        if (!menuItems.length) {
          const menuItems = await fetchData();
          saveMenuItems(menuItems);
        }

        let sections = await getCategories();
        if (!sections.length) {
          sections = menuItems
            .map((item) => item.category)
            .filter((value, index, self) => self.indexOf(value) === index);
        }

        setMenuItems(menuItems);
        setSection(sections);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          filteredSections
        );
        setMenuItems(menuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filteredSections, query]);

  useDebounce({
    effect: () => {
      setQuery(searchText);
    },
    delay: 500,
    deps: [searchText],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        profile={true}
        onRightPress={() => navigation.navigate("Profile")}
      />
      <Hero />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <Text style={styles.orderTxt}>ORDER FOR DELIVERY</Text>
      <View style={styles.buttonsContainer}>
        {/* Button filter */}
        {sections.map((section) => (
          <Chip
            key={section}
            title={section}
            onPress={() => {
              if (filteredSections.includes(section)) {
                setFilteredSection(
                  filteredSections.filter((item) => item !== section)
                );
              } else {
                setFilteredSection([...filteredSections, section]);
              }
            }}
            active={filteredSections.includes(section)}
          />
        ))}
      </View>

      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            desc={item.description}
            price={item.price}
            img={item.image}
          />
        )}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: "#495E57",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  orderTxt: { fontWeight: "600", paddingHorizontal: 16 },
  searchBar: {
    backgroundColor: "#EDEFEE",
    padding: 10,
    borderRadius: 10,
    flexGrow: 0,
    flexShrink: 1,
  },
});
