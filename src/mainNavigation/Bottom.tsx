import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { navigationStrings } from '../NavigationStrings/NavigationStrings'
import HomeIcon from "react-native-vector-icons/Octicons"
import HomeFocused from "react-native-vector-icons/Foundation"
import PlayListIcon from "react-native-vector-icons/MaterialCommunityIcons"
import SettingsIcon from "react-native-vector-icons/Ionicons"
import Home from '../screens/Home'
import Favourites from '../screens/Favourites'
import Playlists from '../screens/Playlists'
import Settings from '../screens/Settings'
const Tab = createBottomTabNavigator()
const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#ff8216", tabBarInactiveTintColor: "#a1a0a3", tabBarLabelStyle: { marginBottom: 3, fontSize: 16 }, tabBarStyle: { backgroundColor: "#181a20", height: 60, paddingTop: 7 } }}   >
      <Tab.Screen name={navigationStrings.home} component={Home} options={{
        headerShown: false, tabBarIcon: ({ color, focused }) => {
          return (
            <>
              {
                focused ?
                  <HomeFocused name={"home"} color={color} size={35} /> : <HomeIcon name="home" size={29} color={"gray"} />
              }
            </>
          )
        }
      }} />
      <Tab.Screen name={navigationStrings.favourites} component={Favourites} options={{
        headerShown: false, tabBarIcon: ({ color, focused }) => {
          return (
            <>
              {focused ?
                <HomeIcon color={color} name='heart-fill' size={29} /> :
                <HomeIcon color={color} name='heart' size={29} />
              }
            </>
          )
        }
      }} />
      <Tab.Screen name={navigationStrings.playlists} component={Playlists} options={{
        headerShown: false, tabBarIcon: ({ focused, color }) => {
          return (
            <>
              {focused ?
                <PlayListIcon color={color} name='playlist-music' size={29} /> :
                <PlayListIcon color={color} name='playlist-music-outline' size={29} />
              }
            </>
          )
        }
      }} />
      <Tab.Screen name={navigationStrings.settings} component={Settings} options={{
        headerShown: false, tabBarIcon: ({ color, focused }) => {
          return (
            <>
              {focused ?
                <SettingsIcon color={color} name='settings' size={29} /> :
                <SettingsIcon color={color} name='settings-outline' size={29} />
              }
            </>
          )
        }
      }} />
    </Tab.Navigator >

  )
}
export default BottomNavigation