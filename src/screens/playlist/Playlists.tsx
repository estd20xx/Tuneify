import React, { memo } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { TypedSelectorHook } from "../../hooks/store.hook"
import { customePlaylist } from "../../store/slices/offlinePlaylist.slice"
const Playlists = () => {
  const offlinePlaylist = TypedSelectorHook(customePlaylist)
  return (
    <View className="w-full h-screen flex   justify-center flex-row">
      <FlatList
        data={offlinePlaylist.playlist}
        keyExtractor={(item, index) => item[0].name}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={4}
        contentContainerStyle={{ paddingBottom: 80 }}
        removeClippedSubviews={true}
        windowSize={10}
        renderItem={({ item, index }) => {
          const { name, songs } = item[0]
          return (
            <TouchableOpacity className="w-full h-16 mt-2 flex flex-row items-center">
              <View className="h-16 w-20  pl-2">
                <FastImage
                  source={{
                    uri: item[0].songs[0].artwork,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.immutable
                  }}
                  className="h-16 w-16 rounded-md"
                />
              </View>
              <View className="w-4/5 ">
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "500",
                    color: "#FFF"
                  }}
                >
                  {name?.length > 45 ? name.slice(0, 45) + "..." : name}
                </Text>
                <Text>{songs.length}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
export default memo(Playlists)
