import React, { memo } from "react"
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native"
import Image from "react-native-fast-image"
import TrackPlayer from "react-native-track-player"
import Show from "../../components/Common/Show"
import NotFound from "../../components/offline/Not-found"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import LocalMediaService from "../../services/localMedia.service"
import {
  centralQueue,
  SpecificQueue,
  updateQueue,
  updateSongQueue
} from "../../store/slices/Queue.slice"
import { tuneifyOfflines } from "../../store/slices/offline.slice"
const local = new LocalMediaService()
const screenId = "offlineSongs"
const Folders = () => {
  const localFile = TypedSelectorHook(tuneifyOfflines)
  const dispatch = useAppDispatch()
  const applicationQueue = TypedSelectorHook(centralQueue)
  const chnageQueueState = async (index: number) => {
    try {
      if (applicationQueue.data?.id != screenId) {
        if (applicationQueue.data?.songs) {
          const previousSongs = localFile.LocalSong.slice(0, index)
          const currentSong = localFile.LocalSong.slice(index, index + 1)
          const nextSongs = localFile.LocalSong.slice(index + 1)
          await TrackPlayer.reset()
          await TrackPlayer.add(currentSong)
          await TrackPlayer.add(nextSongs)
          await TrackPlayer.add(previousSongs)
          await TrackPlayer.play()
          const newQueue: SpecificQueue = {
            id: screenId,
            currentSongIndex: 0,
            isPlaying: true,
            currentSongId: "",
            songs: [...currentSong, ...nextSongs, ...previousSongs]
          }
          dispatch(updateQueue(newQueue))
        }
        return
      }
      if (applicationQueue.data?.songs) {
        const clickedSong = applicationQueue.data.songs[index]
        await TrackPlayer.pause()
        dispatch(updateSongQueue({ index, id: clickedSong.id }))
        await TrackPlayer.skip(index)
        await TrackPlayer.play()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View
      className={`w-full ${
        localFile.LocalSong.length ? "h-auto" : "h-screen flex items-center justify-center"
      }`}
    >
      <Show isVisible={localFile.LocalSong.length > 0}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={localFile.isUploading}
              onRefresh={() => local.getLocalmedia(dispatch)}
            />
          }
          data={localFile.LocalSong}
          keyExtractor={(item, index) => item.id}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={4}
          contentContainerStyle={{ paddingBottom: 80 }}
          removeClippedSubviews={true}
          windowSize={10}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                className="w-full h-16 mt-2 flex flex-row items-center"
                onPress={() => chnageQueueState(index)}
              >
                <View className="h-16 w-20  pl-2">
                  <Image
                    source={{
                      uri: item.artwork,
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
                      color: applicationQueue.data?.currentSongId == item.id ? "#16FF00" : "#FFF"
                    }}
                  >
                    {item.title?.length > 45 ? item.title.slice(0, 45) + "..." : item.title}
                  </Text>
                  <Text style={{ fontSize: 10, color: "#d0d0d1", fontFamily: "200" }}>
                    {item.artist}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </Show>
      <Show isVisible={localFile.LocalSong.length == 0}>
        <NotFound />
      </Show>
    </View>
  )
}
export default memo(Folders)
