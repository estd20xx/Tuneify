import { useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { memo } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { TrendingAlbumPropsTypes } from "../../Interfaces/album.interface"
import { RootStackParamList } from "../../Types/Types"
const TrendingAlbum: React.FC<TrendingAlbumPropsTypes> = ({ data, topic }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <View className="w-full h-44  mt-3">
      <View className="w-full pl-3 h-7 flex items-center flex-row  mb-3">
        <Text className="text-lg font-['500'] text-white  tracking-widest">
          {topic}
        </Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        initialNumToRender={3}
        maxToRenderPerBatch={4}
        removeClippedSubviews={true}
        windowSize={4}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item.id}
              className={`w-28 flex items-center justify-center `}
              onPress={() =>
                navigation.push("TrendingAlbumDetails", { albumData: item })
              }
            >
              <View className=" h-24 w-24  rounded-3xl overflow-hidden">
                <Image
                  source={{
                    uri: item.artwork[2].link
                  }}
                  className="w-full h-full object-fill"
                />
              </View>
              <View className=" w-full h-9 flex items-center justify-center ">
                <Text className="text-white text-xs font-['500'] tracking-wider  ">
                  {item.title.length > 10
                    ? item.title.slice(0, 14) + ".."
                    : item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
export default memo(TrendingAlbum)
