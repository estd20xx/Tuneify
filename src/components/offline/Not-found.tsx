import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import React from "react"
import { Image as Img, Text, TouchableOpacity, View } from "react-native"
import Image from "react-native-fast-image"
import notFoundImage from "../../assets/images/not-found.png"
import { musicService } from "../../services/localMedia.service"
const notFound = Img.resolveAssetSource(notFoundImage).uri
interface Props {
  dispatch: Dispatch<UnknownAction>
}
const NotFound: React.FC<Props> = ({ dispatch }) => {
  // const swipes = Gesture.Simultaneous(
  //   Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
  //   Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
  // );
  return (
    <View className=" h-1/2 w-full flex items-center p-20 ">
      <TouchableOpacity
        className="px-10 py-2 rounded-lg bg-themeOrange"
        onPress={() => musicService.getLocalmedia(dispatch)}
      >
        <Text className="text-black">Sync music</Text>
      </TouchableOpacity>
      <Image
        source={{
          uri: notFound,
          headers: { Authorization: "not found" },
          priority: Image.priority.high,
          cache: Image.cacheControl.immutable
        }}
        className="h-full w-full"
      />
    </View>
  )
}
export default NotFound
