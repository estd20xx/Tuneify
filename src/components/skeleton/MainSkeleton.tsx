import React, { memo } from "react"
import { View } from "react-native"
import SuggestedSkeleton from "./SuggestedSkeleton"
const MainSkeleton = () => {
  return (
    <View>
      {Array.from({ length: 4 }, (_: any, index: number) => (
        <SuggestedSkeleton key={JSON.stringify(index)} />
      ))}
    </View>
  )
}
export default memo(MainSkeleton)
