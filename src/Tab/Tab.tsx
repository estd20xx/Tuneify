import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React, { memo } from "react"
import { tabBar } from "../constants/navigation"
const Tab = createMaterialTopTabNavigator()
const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: "#ff8216",
        tabBarInactiveTintColor: "#a1a0a3",
        tabBarIndicatorStyle: {
          backgroundColor: "#ff8216",
          height: 4,
          marginBottom: -2.2,
          borderRadius: 50
        },
        tabBarStyle: {
          backgroundColor: "#1b1002",
          zIndex: 1,
          borderBottomWidth: 1,
          borderBottomColor: "#a1a0a3"
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
