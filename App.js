/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView
} from 'react-native';

import InitialScreen from "./src/screens/InitialScreen";
import WebViewScreen from './src/screens/WebViewScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


function App() {
  return (

    // <StatusBar barStyle="dark-content" />
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Initial" component={InitialScreen} options={{ title: '' }} />
          <Stack.Screen name="WebView" component={WebViewScreen} options={{ title: '', headerLeft: null }} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
