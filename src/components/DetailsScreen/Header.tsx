import React, { memo, useState } from "react"
import { Image, Pressable, Text, View } from "react-native"
import Show from "../Common/Show"
interface Props {
  title: string
  artwork: string
  type: string
  desc?: string
}
const Header: React.FC<Props> = ({ title, artwork, type, desc }) => {
  const [isFull, setIsFull] = useState(false)
  return (
    <React.Fragment>
      <View className="w-full h-56  flex items-center justify-center">
        <Image source={{ uri: artwork }} className="h-52 w-52 rounded-md" />
      </View>
      <View className="w-full px-3 flex  justify-center">
        <Text className="text-white font-['500'] text-lg tracking-wider">
          {title.slice(0, 35)}
        </Text>
      </View>
      <Show isVisible={desc != undefined && desc.length > 10}>
        <Text className="px-3 mb-2">
          {desc?.slice(0, isFull ? desc.length : 150)}
          <Pressable onPress={() => setIsFull(!isFull)}>
            <Text className="text-orange-400">
              <Show isVisible={!isFull}>...Tap to read more</Show>
              <Show isVisible={isFull}>...Tap to read less</Show>
            </Text>
          </Pressable>
        </Text>
      </Show>
    </React.Fragment>
  )
}
export default memo(Header)
