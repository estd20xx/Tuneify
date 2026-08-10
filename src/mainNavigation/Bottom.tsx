import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CommonActions } from "@react-navigation/native"
import React, { memo } from "react"
import { View } from "react-native"
import { BottomNavigation } from "react-native-paper"
import TuneifyPlayer from "../components/Player/MusicPlayer"
import { TabItems } from "../constants/navigation"
import { useTheme } from "../hooks/useTheme"
import { ItemTypes } from "../Interfaces/icons.interface"
const Tab = createBottomTabNavigator()
const BottomTab = () => {
  const theme = useTheme()
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <View>
          <TuneifyPlayer />
          <BottomNavigation.Bar
            theme={{ colors: { secondaryContainer: theme.accentMuted } }}
            navigationState={state}
            safeAreaInsets={insets}
            shifting={true}
            activeColor={theme.textPrimary}
            inactiveColor={theme.inactive}
            style={{
              height: 50,
              backgroundColor: theme.surface,
              zIndex: 40
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
                <item.Active
                  name={item.activeName}
                  color={color}
                  size={item.activeSize}
                />
              )
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}
export default memo(BottomTab)
