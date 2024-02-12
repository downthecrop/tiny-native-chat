import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GlobalStateProvider from './GlobalStateProvider';


import ChatUI from './ChatUI';
import AboutScreen from './About';
import Configure from './Configure';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    headerTintColor: '#FFFFFF', // Sets the color of the header elements, including the hamburger icon
    primary: 'white', // Used for the active element in the drawer
    background: '#0D0B26', // Used for the background of the drawer
    card: '#0D0B26', // Used for card backgrounds, like header
    text: 'white', // Used for text color
    border: 'white', // Used for border colors
    notification: 'white', // Used for notifications, badges, etc.
  },
};


// Create the drawer navigator
const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <GlobalStateProvider>
      <NavigationContainer theme={MyTheme}>
        <Drawer.Navigator initialRouteName="Chat"
          screenOptions={{
            headerTintColor: '#FFFFFF',
            headerStyle: {
              backgroundColor: '#0D0B26',
            },
          }}>
          <Drawer.Screen name="Chat" component={ChatUI} />
          <Drawer.Screen name="Configure"  component={Configure} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
}
