import {View, Text, TouchableOpacity} from "react-native"
import React from "react"
import TestComp from "../../mainNavigation/TestComp"
const Artists = () => {
  return (
    <View className="h-screen flex items-center justify-center">
      <Text className="text-white">Artists</Text>
      <TestComp />
    </View>
  )
}
export default Artists
