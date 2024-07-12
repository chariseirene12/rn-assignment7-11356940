import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./Screens/Home";
import CartScreen from "./Screens/Cart";
import DetailsScreen from "./Screens/Details";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator for screens nested in the Drawer
function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainHome" component={HomeScreen} />
      <Stack.Screen name="MainCart" component={CartScreen} />
      <Stack.Screen name="MainDetails" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="MainHome"
      >
        <Drawer.Screen name="Home" component={MainStackNavigator} />
        <Drawer.Screen name="Cart" component={CartScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

