import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type Nav = {
  Home: undefined;
  Onboarding: { setIsAuth: (isAuth: boolean) => void };
  Profile: { setIsAuth: (isAuth: boolean) => void };
};

export type HomeStackProps = NativeStackNavigationProp<Nav, "Home">;

export type MenuItem = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};
