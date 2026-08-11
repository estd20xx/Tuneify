import React, { memo, useMemo } from "react"
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
import SongRow from "../../components/Common/SongRow"
import NotFound from "../../components/offline/Not-found"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { mergeDownloadMeta } from "../../helpers/localMedia"
import { musicService } from "../../services/localMedia.service"
import { downloadedMeta } from "../../store/slices/downloads.slice"
import {
  centralQueue,
  SpecificQueue,
  updateQueue
} from "../../store/slices/Queue.slice"
import { tuneifyOfflines } from "../../store/slices/offline.slice"
const Folders = () => {
  const localFile = TypedSelectorHook(tuneifyOfflines)
  const downloads = TypedSelectorHook(downloadedMeta)
  const dispatch = useAppDispatch()
  const applicationQueue = TypedSelectorHook(centralQueue)
  const localSongs = useMemo(
    () => mergeDownloadMeta(localFile.LocalSong, downloads.byPath),
    [localFile.LocalSong, downloads.byPath]
  )
  const changeQueueState = async (index: number, song: StoreSongTypes) => {
    try {
      if (localSongs.length) {
        if (applicationQueue.data.screenId != screens.offlineScreenId) {
          await TrackPlayer.reset()
          await TrackPlayer.add(localSongs)
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
      await TrackPlayer.play()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View
      className={`w-full ${
        localSongs.length
          ? "h-auto"
          : "h-screen flex items-center justify-center"
      }`}
    >
      <Show isVisible={localSongs.length > 0}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={localFile.isUploading}
              onRefresh={() => musicService.getLocalmedia(dispatch)}
            />
          }
          data={localSongs}
          keyExtractor={(item) => item.id}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={4}
          contentContainerStyle={{ paddingBottom: 80 }}
          removeClippedSubviews={true}
          windowSize={10}
          renderItem={({ item, index }) => {
            return (
              <SongRow
                title={item.title}
                subtitle={item.artist}
                artwork={item.artwork}
                isActive={applicationQueue.data.song?.id === item.id}
                onPress={() => changeQueueState(index, item)}
              />
            )
          }}
        />
      </Show>
      <Show isVisible={localSongs.length == 0}>
        <NotFound dispatch={dispatch} />
      </Show>
    </View>
  )
}
export default memo(Folders)
