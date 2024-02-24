import {View, Text, Image, TouchableOpacity} from "react-native"
import React from "react"
import {SeperateAlbumDataPropsTypes} from "../Types/Types"
const SeperateAlbumData: React.FC<SeperateAlbumDataPropsTypes> = ({data}) => {
  return (
    <TouchableOpacity className="h-72 w-[46%] mb-3 border-[1px] border-b-8  rounded-xl overflow-hidden">
      <View className="w-full h-2/3 rounded-md overflow-hidden ">
        <Image source={{uri: data.image[2].link}} className="h-full" />
      </View>
      <View className=" flex h-24 pl-1 ">
        <Text className="text-xl text-white font-bold tracking-wider">
          {data.name.length > 15 ? data.name.slice(0, 15) + ".." : data.name}
        </Text>
        <Text className="text-gray-500 text-lg">
          {data.primaryArtists[0].name}
        </Text>
        <Text className="text-sm text-[#a1a0a3]">{data.songCount}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default SeperateAlbumData
