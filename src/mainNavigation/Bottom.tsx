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
import { View, Text } from 'react-native'
const Tab = createBottomTabNavigator()
const BottomNavigation = () => {
  return (

    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: "white", tabBarInactiveTintColor: "#ff8216", tabBarStyle: { backgroundColor: "#181a20", height: 55 } }}   >
      <Tab.Screen name={navigationStrings.home} component={Home} options={{
        headerShown: false, tabBarIcon: ({ color, focused }) => {
          return (
            <>
              {
                focused ?
                  <View className='bg-[#ff8216] h-[80%] w-full flex items-center justify-center rounded-md duration-500'>
                    <HomeFocused name={"home"} color={color} size={25} />
                  </View> :
                  <HomeIcon name="home" size={20} color={color} />
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
                <View className='bg-[#ff8216] h-[80%] w-full flex items-center justify-center rounded-md duration-500 animate-ping '>
                  <HomeIcon color={color} name='heart-fill' size={20} />
                </View> :
                <HomeIcon color={color} name='heart' size={20} />
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
                <View className='bg-[#ff8216] h-[80%] w-full flex items-center justify-center rounded-md duration-500'>
                  <PlayListIcon color={color} name='playlist-music' size={20} />
                </View> :
                <PlayListIcon color={color} name='playlist-music-outline' size={20} />
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
                <View className='bg-[#ff8216] h-[80%] w-full flex items-center justify-center rounded-md duration-500'>
                  <SettingsIcon color={color} name='settings' size={20} />
                </View> :
                <SettingsIcon color={color} name='settings-outline' size={20} />
              }
            </>
          )
        }
      }} />
    </Tab.Navigator >
  )
}
export default BottomNavigation