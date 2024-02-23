import React, { useEffect, useState } from 'react'
import { FlatList, View, ViewToken, TouchableOpacity } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import ListItem from '../../components/ListItem'
import { SongsTypes } from '../../Types/Types'
import SongService from '../../services/songs.service'
import { songsApi } from '../../api/api'
import { addSongList } from '../../store/Tuneify'
import TrackPlayer from 'react-native-track-player'
import { useAppDispatch } from '../../hooks/store.hook'
const service = new SongService(songsApi)
const Songs = () => {
  console.log("songs render")
  const viewableItems = useSharedValue<ViewToken[]>([])
  const dispatch = useAppDispatch()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sng, setSng] = useState<SongsTypes[]>([])
  useEffect(() => {
    service.getSongs(setSng)
  }, [])
  useEffect(() => {
    if (sng) {
      dispatch(addSongList(sng))
    }
  }, [sng])
  return (
    <View className='bg-[#181a20] w-full h-auto pt-2 mb-20'>
      {sng.length > 1 &&
        <FlatList
          data={sng}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems;
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          initialNumToRender={3}
          renderItem={(items) => {
            const { item, index } = items
            return (
              <TouchableOpacity onPress={async () => {
                await TrackPlayer.pause()
                setCurrentIndex(index)
                await TrackPlayer.skip(index)
                await TrackPlayer.play()
              }}>
                <ListItem item={item} viewableItems={viewableItems} currentIndex={currentIndex} index={index} />
              </TouchableOpacity>
            )
          }}
        />
      }
    </View>
  )
}
export default Songs