import { useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { memo } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { ChartsPropsTypes, RootStackParamList } from "../../Types/Types"
const Charts: React.FC<ChartsPropsTypes> = ({ data, topic }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <View className="w-full h-48 mt-1">
      <View className="w-full pl-3 h-10 flex items-center flex-row  mb-3">
        <Text className="text-lg text-white font-['500'] tracking-widest">
          {topic}
        </Text>
      </View>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        initialNumToRender={3}
        maxToRenderPerBatch={4}
        removeClippedSubviews={true}
        windowSize={4}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              className="w-28 flex items-center justify-center"
              onPress={() =>
                //@ts-ignore
                navigation.navigate("PlaylistDetails", { playlistData: item })
              }
            >
              <View className=" h-24 w-24  rounded-3xl  overflow-hidden">
                <Image
                  source={{
                    uri: item.artwork[2].link
                  }}
                  className="w-full h-full"
                />
              </View>
              <View className=" w-full h-9 flex items-center justify-center">
                <Text className="text-white text-xs tracking-wider font-['500'] ">
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
export default memo(Charts)
