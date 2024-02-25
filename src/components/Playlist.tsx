import {View, Text, FlatList, TouchableOpacity} from "react-native"
import React, {useCallback} from "react"
import {RootStackParamList} from "../Types/Types"
import {useNavigation} from "@react-navigation/core"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import Image from "react-native-fast-image"
import {
  PlaylistDataProps,
  PlaylistTypes,
} from "../Interfaces/playlist.interface"
const Playlist: React.FC<PlaylistDataProps> = ({data, topic}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const renderItem = useCallback(
    ({item}: {item: PlaylistTypes}) => (
      <TouchableOpacity
        className="   flex items-center justify-center ml-2"
        onPress={() =>
          navigation.navigate("PlaylistDetails", {playlistData: item})
        }>
        <View className=" h-36 w-36  rounded-full overflow-hidden">
          <Image
            source={{
              uri: item.image[2].link,
              headers: {Authorization: "someAuthToken"},
              priority: Image.priority.normal,
              cache: Image.cacheControl.immutable,
            }}
            className="w-full h-full"
          />
        </View>
        <View className=" w-full h-9 flex items-center justify-center">
          <Text className="text-white text-xs tracking-wider font-[500] ">
            {item.title.length > 10
              ? item.title.slice(0, 11) + ".."
              : item.title}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  )
  return (
    <View className="w-full h-auto    ">
      <View className="w-full pl-3 h-10 flex items-center flex-row  mb-3">
        <Text className="text-lg text-white font-[500] tracking-widest">
          {topic}
        </Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        initialNumToRender={3}
        maxToRenderPerBatch={4}
        removeClippedSubviews={true}
        windowSize={4}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Playlist
