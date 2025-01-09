import React from "react"
import { View } from "react-native"
const SongSkeleton = () => {
  return (
    <View className=" h-auto w-full flex items-center">
      {Array.from({ length: 8 }, (_: number, index: number) => {
        return (
          <View
            className="w-[98%]
             rounded-md h-16 mt-2 flex flex-row items-center bg-gray-700"
            key={_}
          />
        )
      })}
    </View>
  )
}
export default SongSkeleton
