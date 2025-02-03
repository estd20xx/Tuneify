import React, { memo } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { SeperateAlbumDataPropsTypes } from "../Interfaces/album.interface"
const SeperateAlbumData: React.FC<SeperateAlbumDataPropsTypes> = ({ data }) => {
  return (
    <TouchableOpacity className="h-72 w-[46%] mb-3 border-[1px] border-b-8  rounded-xl overflow-hidden">
      <View className="w-full h-2/3 rounded-md overflow-hidden ">
        <Image source={{ uri: data.image[2].link }} className="h-full" />
      </View>
      <View className=" flex h-24 pl-1 pt-2 ">
        <Text className="text-xl text-white font-['500'] tracking-wider">
          {data.name.slice(0, 15)}
        </Text>
        <Text className="text-gray-500 text-lg font-['300']">
          {data.primaryArtists[0].name}
        </Text>
        <Text className="text-sm text-[#a1a0a3] font-['200']">
          {data.songCount}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export default memo(SeperateAlbumData)
