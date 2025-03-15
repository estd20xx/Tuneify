import React, { memo } from "react"
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import TrackPlayer from "react-native-track-player"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { screens } from "../../api/base/constrants"
import Show from "../../components/Common/Show"
import NotFound from "../../components/offline/Not-found"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { musicService } from "../../services/localMedia.service"
import {
  centralQueue,
  SpecificQueue,
  updateQueue
} from "../../store/slices/Queue.slice"
import { tuneifyOfflines } from "../../store/slices/offline.slice"
const Folders = () => {
  const localFile = TypedSelectorHook(tuneifyOfflines)
  const dispatch = useAppDispatch()
  const applicationQueue = TypedSelectorHook(centralQueue)
  const changeQueueState = async (index: number, song: StoreSongTypes) => {
    try {
      if (localFile.LocalSong) {
        if (applicationQueue.data.screenId != screens.offlineScreenId) {
          await TrackPlayer.reset()
          await TrackPlayer.add(localFile.LocalSong)
          await TrackPlayer.skip(index)
          await TrackPlayer.play()
          const newQueue: SpecificQueue = {
            screenId: screens.offlineScreenId,
            isPlaying: true,
            song
          }
          dispatch(updateQueue(newQueue))
          return
        }
      }
      await TrackPlayer.skip(index)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View
      className={`w-full ${
        localFile.LocalSong.length
          ? "h-auto"
          : "h-screen flex items-center justify-center"
      }`}
    >
      <Show isVisible={localFile.LocalSong.length > 0}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={localFile.isUploading}
              onRefresh={() => musicService.getLocalmedia(dispatch)}
            />
          }
          data={localFile.LocalSong}
          keyExtractor={(item) => item.id}
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
                onPress={() => changeQueueState(index, item)}
              >
                <View className="h-16 w-20  pl-2">
                  <Image
                    source={{ uri: item.artwork }}
                    className="h-16 w-16"
                    style={{
                      borderRadius: 17
                    }}
                  />
                </View>
                <View className="w-4/5 ">
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "500",
                      color:
                        applicationQueue.data.song?.id == item.id
                          ? "#16FF00"
                          : "#FFF"
                    }}
                  >
                    {item.title.slice(0, 40)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#d0d0d1",
                      fontFamily: "200"
                    }}
                  >
                    {item.artist}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </Show>
      <Show isVisible={localFile.LocalSong.length == 0}>
        <NotFound dispatch={dispatch} />
      </Show>
    </View>
  )
}
export default memo(Folders)
