import { useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { memo } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import Image from "react-native-fast-image"
import { PlaylistDataProps } from "../../Interfaces/playlist.interface"
import { RootStackParamList } from "../../Types/Types"
const Playlist: React.FC<PlaylistDataProps> = ({ data, topic }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <View className="w-full h-48">
      <View className="w-full pl-3 h-10 flex items-center flex-row  mb-3">
        <Text className="text-lg text-white font-['500'] tracking-widest">
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
              className="w-28 flex items-center justify-center"
              onPress={() =>
                navigation.navigate("PlaylistDetails", { playlistData: item })
              }
            >
              <View className="h-24 w-24 rounded-full overflow-hidden">
                <Image
                  source={{
                    uri: item.artwork[2].link,
                    headers: { Authorization: "someAuthToken" },
                    priority: Image.priority.normal,
                    cache: Image.cacheControl.immutable
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className=" w-full h-9 flex items-center justify-center">
                <Text className="text-white text-xs tracking-wider font-['500'] ">
                  {item.title.length > 10
                    ? item.title.slice(0, 11) + ".."
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

export default memo(Playlist)
