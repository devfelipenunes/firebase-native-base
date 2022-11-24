import React, { useEffect, useRef } from "react";
import axios from "axios";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NativeBaseProvider } from "native-base";

import { Login } from "./screens/Login";
import { SignUp } from "./screens/SignUp";
import { ResetPassword } from "./screens/ResetPassword";
import ToDo from "./screens/ToDo";
import ManageAccount from "./screens/ManageAccount";

const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();

  useEffect(() => {
    axios.post(`https://app.nativenotify.com/api/analytics`, {
      app_id: 4982,
      app_token: " fdxmz5ospFeqvXeZpQEF3V ",
      screenName: "Home",
    });
  });

  return (
    <NativeBaseProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            axios.post(`https://app.nativenotify.com/api/analytics`, {
              app_id: 4982,
              app_token: "fdxmz5ospFeqvXeZpQEF3V",
              screenName: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ToDo"
            component={ToDo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageAccount"
            component={ManageAccount}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
