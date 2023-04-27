import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// or any pure javascript modules available in npm
import { Onboarding } from "./screens/Onboarding";
import { Home } from "./screens/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Splash } from "./screens/Splash";
import { Profile } from "./screens/Profile";
import { Nav } from "./types";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<Nav>();

const App = () => {
  const [fontsLoaded] = useFonts({
    Markazi: require("./assets/Fonts/MarkaziText-Regular.ttf"),
    Karla: require("./assets/Fonts/Karla-Regular.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        // await AsyncStorage.clear();
        const isAuth = await AsyncStorage.getItem("isAuth");
        setIsAuth(isAuth === "true");
      } catch (e) {
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuth ? (
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            initialParams={{ setIsAuth }}
          />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Profile"
              component={Profile}
              initialParams={{ setIsAuth }}
              options={{}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
