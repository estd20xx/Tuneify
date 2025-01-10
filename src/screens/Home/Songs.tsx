import React, { memo, useEffect } from "react"
import { FlatList, TouchableOpacity, View, ViewToken } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import TrackPlayer from "react-native-track-player"
import Show from "../../components/Common/Show"
import ListItem from "../../components/Song/ListItem"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { sanitize } from "../../services/sanitizer.service"
import { songServiceaction } from "../../store/actions/song.action"
import {
  centralQueue,
  SpecificQueue,
  updateQueue,
  updateSongQueue
} from "../../store/slices/Queue.slice"
import { testSong } from "../../store/slices/song.slice"
const screenId = "songs"
const Songs = () => {
  const viewableItems = useSharedValue<ViewToken[]>([])
  const dispatch = useAppDispatch()
  const songs = TypedSelectorHook(testSong)
  const applicationQueue = TypedSelectorHook(centralQueue)
  const chnageQueueState = async (index: number) => {
    try {
      if (applicationQueue.data?.id != screenId) {
        if (songs.data) {
          const previousSongs = songs.data?.songs.slice(0, index)
          const currentSong = songs.data?.songs.slice(index, index + 1)
          const nextSongs = songs.data?.songs.slice(index + 1)
          await TrackPlayer.reset()
          await TrackPlayer.add(sanitize.songs(currentSong))
          await TrackPlayer.add(sanitize.songs(nextSongs))
          await TrackPlayer.add(sanitize.songs(previousSongs))
          await TrackPlayer.play()
          const newQueue: SpecificQueue = {
            id: screenId,
            currentSongIndex: 0,
            isPlaying: true,
            currentSongId: "",
            songs: [
              ...sanitize.songs(currentSong),
              ...sanitize.songs(nextSongs),
              ...sanitize.songs(previousSongs)
            ]
          }
          dispatch(updateQueue(newQueue))
        }
        return
      }
      if (applicationQueue.data?.songs) {
        const clickedSong = applicationQueue.data.songs[index]
        dispatch(updateSongQueue({ index, id: clickedSong.id }))
        await TrackPlayer.skip(index)
        await TrackPlayer.play()
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (!applicationQueue.data?.songs) {
      dispatch(songServiceaction.getSongs())
    }
  }, [])
  useEffect(() => {
    if (songs.data?.songs) {
      const newQueue: SpecificQueue = {
        id: screenId,
        isPlaying: false,
        currentSongIndex: 0,
        currentSongId: "",
        songs: [...sanitize.songs(songs.data.songs)]
      }
      dispatch(updateQueue(newQueue))
    }
  }, [songs])
  return (
    <View className="bg-[#181a20] w-full h-auto pt-2">
      <Show isVisible={songs?.data?.songs?.length != undefined || songs?.data?.songs?.length != 0}>
        <FlatList
          data={songs.data?.songs}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
          keyExtractor={(item) => item.id}
          initialNumToRender={3}
          renderItem={(items) => {
            const { item, index } = items
            return (
              <TouchableOpacity key={JSON.stringify(index)} onPress={() => chnageQueueState(index)}>
                <ListItem
                  item={item}
                  viewableItems={viewableItems}
                  id={applicationQueue.data?.currentSongId ?? "random"}
                />
              </TouchableOpacity>
            )
          }}
        />
      </Show>
    </View>
  )
}
export default memo(Songs)
