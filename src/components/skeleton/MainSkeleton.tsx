import { View } from "react-native"
import React from "react"
import { component } from "../../constants/screens"
const MainSkeleton = () => {
  return (
    <View>
      {Array.from({ length: 4 }, (_: any, index: number) => (
        <component.CSuggestedSkeleton key={JSON.stringify(index)} />
      ))}
    </View>
  )
}
export default MainSkeleton
