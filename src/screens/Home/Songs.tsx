import React, { memo, useEffect } from "react"
import { FlatList, View, ViewToken } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import TrackPlayer from "react-native-track-player"
import { screens } from "../../api/base/constrants"
import { Song } from "../../api/service/Payload.service"
import Show from "../../components/Common/Show"
import ListItem from "../../components/Song/ListItem"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { sanitize } from "../../services/sanitizer.service"
import { songServiceaction } from "../../store/actions/song.action"
import {
  centralQueue,
  SpecificQueue,
  updateQueue
} from "../../store/slices/Queue.slice"
import { testSong } from "../../store/slices/song.slice"
const Songs = () => {
  const viewableItems = useSharedValue<ViewToken[]>([])
  const dispatch = useAppDispatch()
  const songs = TypedSelectorHook(testSong)
  const applicationQueue = TypedSelectorHook(centralQueue)
  const changeQueueState = async (index: number, song: Song) => {
    try {
      if (songs.data?.songs) {
        if (applicationQueue.data.screenId != screens.songsScreenId) {
          await TrackPlayer.reset()
          await TrackPlayer.add(sanitize.songs(songs.data.songs))
          await TrackPlayer.skip(index)
          await TrackPlayer.play()
          const newQueue: SpecificQueue = {
            screenId: screens.songsScreenId,
            isPlaying: true,
            song: sanitize.songs([song])[0]
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
  useEffect(() => {
    if (!applicationQueue.data?.song) {
      dispatch(songServiceaction.getSongs())
    }
  }, [])
  return (
    <View className="w-full h-auto pt-2">
      <Show
        isVisible={
          songs?.data?.songs?.length != undefined ||
          songs?.data?.songs?.length != 0
        }
      >
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
              <ListItem
                key={JSON.stringify(index)}
                onpress={() => changeQueueState(index, item)}
                item={item}
                viewableItems={viewableItems}
                id={applicationQueue.data.song?.id ?? "random"}
              />
            )
          }}
        />
      </Show>
    </View>
  )
}
export default memo(Songs)
