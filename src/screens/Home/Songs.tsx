import React, { memo, useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View, ViewToken } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import TrackPlayer from "react-native-track-player"
import { songsApi } from "../../api/api"
import { Song } from "../../api/service/Payload.service"
import ListItem from "../../components/ListItem"
import Show from "../../components/Show"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import SongService from "../../services/songs.service"
import { songServiceaction } from "../../store/actions/song.action"
import { SpecificQueue, updateQueue } from "../../store/slices/new/Queue.slice"
import { testSong } from "../../store/slices/new/song.slice"
const pageId = "songs"
const service = new SongService(songsApi)
const Songs = () => {
  console.log("songs render")
  const viewableItems = useSharedValue<ViewToken[]>([])
  const dispatch = useAppDispatch()
  const songs = TypedSelectorHook(testSong)
  const [currentId, setCurrentId] = useState<string>("")
  const sanitizePlayerData = (songsList: Array<Song>) => {
    const data = songsList.map((cx) => {
      const songs: StoreSongTypes = {
        id: cx.id,
        title: cx.title,
        artist: cx.artist,
        artwork: cx.image[2].link,
        url: cx.link[2].link
      }
      return songs
    })
    return data
  }
  useEffect(() => {
    dispatch(songServiceaction.getSongs())
    // service.getSongs(setSng)
  }, [])
  useEffect(() => {
    if (songs.data?.songs) {
      const newQueue: SpecificQueue = {
        id: pageId,
        isPlaying: false,
        currentSongIndex: 0,
        currentSongId: "",
        songs: [...sanitizePlayerData(songs.data.songs)]
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
              <TouchableOpacity
                key={JSON.stringify(index)}
                onPress={async () => {
                  await TrackPlayer.pause()
                  setCurrentId(item.id)
                  await TrackPlayer.skip(index)
                  await TrackPlayer.play()
                }}
              >
                <ListItem
                  item={item}
                  viewableItems={viewableItems}
                  currentId={currentId}
                  id={item.id}
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
