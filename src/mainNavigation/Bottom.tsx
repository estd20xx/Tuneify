import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CommonActions } from "@react-navigation/native"
import React, { memo } from "react"
import { View } from "react-native"
import { BottomNavigation } from "react-native-paper"
import BottomPlayer from "../components/Player/BottomPlayer"
import { TabItems } from "../constants/naviG"
import { ItemTypes } from "../Interfaces/icons.interface"
const Tab = createBottomTabNavigator()
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <View>
          <BottomPlayer />
          <BottomNavigation.Bar
            theme={{ colors: { secondaryContainer: "#2D3250" } }}
            navigationState={state}
            safeAreaInsets={insets}
            shifting={true}
            activeColor="#a1a0a3"
            inactiveColor="#a1a0a3"
            style={{
              height: 50,
              backgroundColor: "#000000"
            }}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true
              })

              if (event.defaultPrevented) {
                preventDefault()
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key
                })
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key]
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 20 })
              }
              return null
            }}
          /** TODO : to shot label
    getLabelText={({ route }) => {
      return route.name
    }}
    */
          />
        </View>
      )}
    >
      {TabItems.map((item: ItemTypes) => {
        return (
          <Tab.Screen
            name={item.name}
            component={item.component}
            key={item.name}
            options={{
              tabBarIcon: ({ color }) => (
                <item.Active name={item.activeName} color={color} size={item.activeSize} />
              )
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}
export default memo(BottomTab)
