import {View, Text} from "react-native"
import React from "react"
import {createDrawerNavigator} from "@react-navigation/drawer"
import TestComp from "./TestComp"
const Draw = createDrawerNavigator()
const Drawer = () => {
  return (
    <Draw.Navigator>
      <Draw.Screen name="test" component={TestComp} />
    </Draw.Navigator>
  )
}
export default Drawer
