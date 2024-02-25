import {View, Text, FlatList, TouchableOpacity} from "react-native"
import React, {useCallback} from "react"
import Image from "react-native-fast-image"
import {AlbumDataProps, AlbumTypes} from "../Interfaces/album.interface"
const Albums: React.FC<AlbumDataProps> = ({data, topic}) => {
  const renderItem = useCallback(
    ({item}: {item: AlbumTypes}) => (
      <TouchableOpacity>
        <View className="  flex items-center justify-center w-36 ml-2">
          <View className={` h-36 w-36  rounded-3xl overflow-hidden`}>
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
          <View className=" w-full h-9 flex items-center  justify-center">
            <Text className="text-white text-xs tracking-wider font-semibold ">
              {item.name.length > 10
                ? item.name.slice(0, 14) + ".."
                : item.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [],
  )
  return (
    <View className="w-full h-auto  ">
      <View className="w-full pl-3 h-10 flex items-center flex-row  mb-3">
        <Text className="text-lg text-white font-semibold tracking-widest">
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

export default Albums
