import {View, Text, FlatList, TouchableOpacity} from "react-native"
import React, {useCallback} from "react"
import {RootStackParamList} from "../Types/Types"
import {useNavigation} from "@react-navigation/core"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import Image from "react-native-fast-image"
import {TrendingAlbumPropsTypes} from "../Interfaces/album.interface"
import {AlbumResponse} from "../api/interface/module.interface"
const TrendingAlbum: React.FC<TrendingAlbumPropsTypes> = ({data, topic}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const renderItem = useCallback(
    ({item}: {item: AlbumResponse}) => (
      <TouchableOpacity
        className={`flex items-center justify-center ml-2 `}
        onPress={() =>
          navigation.navigate("TrendingAlbumDetails", {albumData: item})
        }>
        <View className=" h-36 w-36  rounded-3xl overflow-hidden">
          <Image
            source={{
              uri: item.artwork[2].link,
              headers: {Authorization: "someAuthToken"},
              priority: Image.priority.normal,
              cache: Image.cacheControl.immutable,
            }}
            className="w-full h-full"
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
    ),
    []
  )
  return (
    <View className="w-full h-56  mt-3">
      <View className="w-full pl-3 h-7 flex items-center flex-row  mb-3">
        <Text className="text-lg font-['500'] text-white  tracking-widest">
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

export default TrendingAlbum
