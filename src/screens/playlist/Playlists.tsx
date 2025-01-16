import React, { memo, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import {
  ChildPlaylistInterface,
  customePlaylist,
  newPlaylist
} from "../../store/slices/offlinePlaylist.slice"
import { centralQueue } from "../../store/slices/Queue.slice"
const Playlists = () => {
  const dispatch = useAppDispatch()
  const offlinePlaylist = TypedSelectorHook(customePlaylist)
  const [userin, setUserin] = useState<string>("")
  const applicationQueue = TypedSelectorHook(centralQueue)
  const createNewPlaylist = () => {
    if (applicationQueue.data.song) {
      const d: ChildPlaylistInterface = {
        name: userin,
        songs: [applicationQueue.data.song]
      }
      dispatch(newPlaylist([d]))
    }
  }
  return (
    <View className="w-full h-screen flex   justify-center flex-row">
      <View></View>
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
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
export default memo(Playlists)
