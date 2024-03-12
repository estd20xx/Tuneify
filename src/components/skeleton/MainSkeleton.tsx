import {View} from "react-native"
import React from "react"
import {component} from "../../constants/screens"
const MainSkeleton = () => {
  return (
    <View>
      {Array.from(
        [1, 2, 3, 4].map(c => {
          return <component.CSuggestedSkeleton key={c} />
        })
      )}
    </View>
  )
}
export default MainSkeleton
