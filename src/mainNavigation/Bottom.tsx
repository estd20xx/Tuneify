import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CommonActions } from "@react-navigation/native"
import React, { memo } from "react"
import { View } from "react-native"
import { BottomNavigation } from "react-native-paper"
import TuneifyPlayer from "../components/Player/MusicPlayer"
import { TabItems } from "../constants/navigation"
import { BOTTOM_NAV_HEIGHT } from "../constants/layout"
import { useMd3Colors } from "../hooks/useMd3"
import { ItemTypes } from "../Interfaces/icons.interface"
const Tab = createBottomTabNavigator()
const BottomTab = () => {
  const md3 = useMd3Colors()
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <View>
          <TuneifyPlayer />
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            shifting={false}
            activeColor={md3.onSecondaryContainer}
            inactiveColor={md3.onSurfaceVariant}
            activeIndicatorStyle={{ backgroundColor: md3.secondaryContainer }}
            style={{
              height: BOTTOM_NAV_HEIGHT,
              backgroundColor: md3.elevation.level2,
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
