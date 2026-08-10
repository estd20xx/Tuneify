import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React, { memo } from "react"
import { tabBar } from "../constants/navigation"
import { useTheme } from "../hooks/useTheme"
const Tab = createMaterialTopTabNavigator()
const TabBar = () => {
  const theme = useTheme()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.inactive,
        tabBarIndicatorStyle: {
          backgroundColor: theme.accent,
          height: 4,
          marginBottom: -2.2,
          borderRadius: 50
        },
        tabBarStyle: {
          backgroundColor: theme.background,
          zIndex: 1,
          borderBottomWidth: 1,
          borderBottomColor: theme.inactive
        },
        tabBarItemStyle: {
          width: 90
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginLeft: -10,
          fontFamily: "600"
        }
      }}
    >
      {tabBar.map((bar) => {
        return (
          <Tab.Screen
            name={bar.name}
            component={bar.component}
            key={bar.name}
          />
        )
      })}
    </Tab.Navigator>
  )
}
export default memo(TabBar)
