import React from 'react'
import { NavigationContainer as Container } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationStrings } from '../NavigationStrings/NavigationStrings'
import HomePage from '../screens/HomePage'
import Home from '../screens/Home'
import Favourites from '../screens/Favourites'
import Playlists from '../screens/Playlists'
import Settings from '../screens/Settings'
import Splash from '../screens/Splash'
import Bottom from './Bottom'
const Stack = createNativeStackNavigator()
const MainNavigation = () => {
  return (
    <Container>
      <Stack.Navigator>
        <Stack.Screen name={navigationStrings.splash} component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name={navigationStrings.homePage} component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name={navigationStrings.home} component={Home} options={{ headerShown: false }} />
        <Stack.Screen name={navigationStrings.favourites} component={Favourites} options={{ headerShown: false }} />
        <Stack.Screen name={navigationStrings.playlists} component={Playlists} options={{ headerShown: false }} />
        <Stack.Screen name={navigationStrings.settings} component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name={navigationStrings.bottom} component={Bottom} options={{ headerShown: false }} />
      </Stack.Navigator>
    </Container>
  )
}
export default MainNavigation