import {View, Text, FlatList, TouchableOpacity} from "react-native"
import React, {useCallback} from "react"
import Image from "react-native-fast-image"
import {
  TrendingSongTypes,
  TrendingSongsPropsTypes,
} from "../Interfaces/songs.interface"
const TrendingSong: React.FC<TrendingSongsPropsTypes> = ({data, topic}) => {
  const renderItem = useCallback(
    ({item}: {item: TrendingSongTypes}) => (
      <TouchableOpacity>
        <View className="  flex items-center justify-center w-36 ml-2">
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
            <Text className="text-white text-xs tracking-wider font-['500'] ">
              {item.label.length > 10
                ? item.label.slice(0, 14) + ".."
                : item.label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [],
  )
  return (
    <View className="w-full h-auto  mt-3 ">
      <View className="w-full pl-3 h-10 flex items-center flex-row  mb-3">
        <Text className="text-xl text-white font-['500'] tracking-widest">
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
        contentContainerStyle={{paddingBottom: 35}}
        removeClippedSubviews={true}
        windowSize={4}
        renderItem={renderItem}
      />
    </View>
  )
}
export default TrendingSong
