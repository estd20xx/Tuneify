import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View, ViewToken } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import TrackPlayer from "react-native-track-player"
import { songsApi } from "../../api/api"
import { Song } from "../../api/service/Payload.service"
import ListItem from "../../components/ListItem"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import SongService from "../../services/songs.service"
import { songServiceaction } from "../../store/actions/song.action"
import { testSong } from "../../store/slices/new/song.slice"
import { addSongList } from "../../store/slices/song.slice"
const service = new SongService(songsApi)
const Songs = () => {
  console.log("songs render")
  const viewableItems = useSharedValue<ViewToken[]>([])
  const dispatch = useAppDispatch()
  const songs = TypedSelectorHook(testSong)
  const [currentId, setCurrentId] = useState<string>("")
  const [sng, setSng] = useState<Song[]>([])
  useEffect(() => {
    dispatch(songServiceaction.getSongs())
    // service.getSongs(setSng)
  }, [])
  useEffect(() => {
    if (songs.data) {
      setSng(songs.data.songs)
      dispatch(addSongList(sng))
    }
  }, [songs])
  console.log(songs.data?.songs[0].link)
  return (
    <View className="bg-[#181a20] w-full h-auto pt-2">
      {sng.length > 1 && (
        <FlatList
          data={sng}
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
      )}
    </View>
  )
}
export default Songs
