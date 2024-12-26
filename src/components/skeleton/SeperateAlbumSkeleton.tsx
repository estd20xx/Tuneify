import React, { memo } from "react"
import { Text, View } from "react-native"
const SeperateSkeleton = () => {
  return (
    <View className="bg-gray-700 h-72 w-[46%] mb-3 rounded-xl overflow-hidden">
      <View className="w-full h-2/3 rounded-md overflow-hidden "></View>
      <View className=" flex h-24 pl-1 ">
        <Text className="text-xl text-white font-bold tracking-wider"></Text>
        <Text className="text-gray-500 text-lg"></Text>
        <Text className="text-sm text-[#a1a0a3]"></Text>
      </View>
    </View>
  )
}
export default memo(SeperateSkeleton)
