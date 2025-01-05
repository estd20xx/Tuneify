import React, { memo, useCallback } from "react"
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native"
import Image from "react-native-fast-image"
import NotFound from "../../components/Not-found"
import Show from "../../components/Show"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { LocalFileTypes } from "../../Interfaces/tuneifySlice.interface"
import LocalMediaService from "../../services/localMedia.service"
import { tuneifyOfflines } from "../../store/slices/new/offline.slice"
const local = new LocalMediaService()
const Folders = () => {
  const testId = "1212"
  const localFile = TypedSelectorHook(tuneifyOfflines)
  const dispatch = useAppDispatch()
  const renderItem = useCallback(
    ({ item, index }: { item: LocalFileTypes; index: number }) => (
      <TouchableOpacity className="w-full h-16  mt-2  flex flex-row items-center">
        <View className="h-16 w-20  pl-2">
          <Image
            source={{
              uri: item.cover,
              headers: { Authorization: "deviceImage" },
              priority: Image.priority.high,
              cache: Image.cacheControl.immutable
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
              // color: index == current.index && testId == current.trackId ? "#16FF00" : "#FFF"
            }}
          >
            {item.title?.length > 45 ? item.title.slice(0, 45) + "..." : item.title}
          </Text>
          <Text style={{ fontSize: 10, color: "#d0d0d1", fontFamily: "200" }}>{item.artist}</Text>
        </View>
      </TouchableOpacity>
    ),
    []
  )
  return (
    <View
      className={`w-full ${
        localFile.LocalSong.length ? "h-auto" : "h-screen flex items-center justify-center"
      }`}
    >
      <RefreshControl
        refreshing={localFile.isUploading}
        onRefresh={() => local.getLocalmedia(dispatch)}
      />
      <Show isVisible={localFile.LocalSong.length > 0}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={localFile.isUploading}
              onRefresh={() => local.getLocalmedia(dispatch)}
            />
          }
          data={localFile.LocalSong}
          keyExtractor={(_, index) => JSON.stringify(index)}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={4}
          contentContainerStyle={{ paddingBottom: 80 }}
          removeClippedSubviews={true}
          windowSize={10}
          renderItem={renderItem}
        />
      </Show>
      <Show isVisible={localFile.LocalSong.length == 0}>
        <NotFound />
      </Show>
    </View>
  )
}
export default memo(Folders)
