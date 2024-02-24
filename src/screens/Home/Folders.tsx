import {View, Text, FlatList, Image, TouchableOpacity} from "react-native"
import React, {useCallback} from "react"
import {tuneifyOfflines} from "../../store/slices/offline.slice"
import {TypedSelectorHook} from "../../hooks/store.hook"
import {LocalFileTypes} from "../../Interfaces/tuneifySlice.interface"
const Folders = () => {
  const localFile = TypedSelectorHook(tuneifyOfflines)
  console.log("folder render")
  const renderItem = useCallback(
    ({item}: {item: LocalFileTypes}) => (
      <TouchableOpacity className="w-full h-16  mt-2  flex flex-row items-center">
        <View className="h-16 w-20  pl-2">
          <Image
            source={require("../../assets/images/new.png")}
            className="h-16 w-16 rounded-md"
          />
        </View>
        <View className="w-4/5">
          <Text style={{fontSize: 14, color: "white"}}>{item.title}</Text>
          <Text style={{fontSize: 10, color: "#d0d0d1"}}>{item.artist}</Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  )
  return (
    <View className="bg-[#181a20] w-full h-auto">
      <FlatList
        data={localFile.LocalSong}
        keyExtractor={item => item.url}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={4}
        contentContainerStyle={{paddingBottom: 80}}
        removeClippedSubviews={true}
        windowSize={10}
        renderItem={renderItem}
      />
    </View>
  )
}
export default Folders
