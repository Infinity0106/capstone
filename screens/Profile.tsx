import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Header } from "../components/Header";
import { ProfileForm } from "../components/ProfileForm";

type ProfileRouteParams = {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export const Profile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { setIsAuth } = route.params as ProfileRouteParams;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        backArrow
        profile
        onLeftPress={() => {
          navigation.goBack();
        }}
        onRightPress={() => {}}
      />
      <View
        style={{
          borderColor: "#EDEFEE",
          borderWidth: 3,
          borderRadius: 10,
          padding: 9,
        }}
      >
        <ProfileForm
          onSubmit={async (values) => {
            try {
              await AsyncStorage.setItem("user", JSON.stringify(values));
            } catch (e) {
              console.log(e.message);
            }
          }}
          onLogOut={async () => {
            try {
              await AsyncStorage.clear();
              setIsAuth(false);
            } catch (e) {
              console.log(e.message);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
