import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { LogInForm } from "../components/LogInForm";

type OnboardingRouteParams = {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export const Onboarding: React.FC = () => {
  const route = useRoute();
  const { setIsAuth } = route.params as OnboardingRouteParams;
  const onSubmit = useCallback(async (values) => {
    await AsyncStorage.multiSet([
      ["isAuth", "true"],
      ["user", JSON.stringify(values)],
    ]);
    setIsAuth(true);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header profile={true} />
      <Hero />
      <LogInForm onSubmit={onSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
