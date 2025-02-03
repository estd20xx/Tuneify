import React, { memo } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
interface Props {
  title: string
  artwork: string
  type: string
}
const Header: React.FC<Props> = ({ title, artwork, type }) => {
  return (
    <React.Fragment>
      <View className="w-full h-56  flex items-center justify-center">
        <Image source={{ uri: artwork }} className="h-52 w-52 rounded-md" />
      </View>
      <View className="w-full px-3 flex  justify-center">
        <Text className="text-white font-['500'] text-lg tracking-wider">
          {title.slice(0, 35)}
        </Text>
        <TouchableOpacity>
          <Text className="text-gray-300 text-base font-['400']">{type}</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  )
}
export default memo(Header)
