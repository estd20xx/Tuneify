import React, { memo } from "react"
import { View } from "react-native"
const SuggestedSkeleton = () => {
  return (
    <View className=" h-auto w-full">
      <View className="h-48 w-full  flex items-center flex-row justify-evenly">
        {Array.from([1, 2, 3], (current) => {
          return (
            <View
              key={current}
              className="w-32  h-full flex items-center justify-evenly   "
            >
              <View className="bg-gray-700 animate-pulse h-36 w-32  rounded-3xl overflow-hidden"></View>
              <View className=" w-full bg-gray-700 rounded-md mt-1 h-9 flex items-center justify-center"></View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
export default memo(SuggestedSkeleton)
