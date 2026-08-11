import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React, { memo } from "react"
import { tabBar } from "../constants/navigation"
import { useMd3Colors } from "../hooks/useMd3"
const Tab = createMaterialTopTabNavigator()
const TabBar = () => {
  const md3 = useMd3Colors()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: md3.primary,
        tabBarInactiveTintColor: md3.onSurfaceVariant,
        tabBarPressColor: md3.secondaryContainer,
        tabBarIndicatorStyle: {
          backgroundColor: md3.primary,
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3
        },
        tabBarStyle: {
          backgroundColor: md3.elevation.level2,
          zIndex: 1,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: md3.outlineVariant
        },
        tabBarItemStyle: {
          width: 110
        },
        tabBarLabelStyle: {
          fontSize: 12,
          letterSpacing: 0.1,
          textTransform: "none",
          fontWeight: "500"
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
