import React, { memo } from "react"
import { FlatList, View } from "react-native"
import TrackPlayer from "react-native-track-player"
import { screens } from "../api/base/constrants"
import SongRow from "../components/Common/SongRow"
import FavouriteHeader from "../components/favourite/Header"
import { TypedSelectorHook, useAppDispatch } from "../hooks/store.hook"
import { UserFavouritesTypes } from "../Interfaces/tuneifySlice.interface"
import { tuneifyFavourites } from "../store/slices/favourite.slice"
import {
  centralQueue,
  SpecificQueue,
  updateQueue
} from "../store/slices/Queue.slice"
const Favourites = () => {
  const data = TypedSelectorHook(tuneifyFavourites)
  const applicationQueue = TypedSelectorHook(centralQueue)
  const dispatch = useAppDispatch()
  const changeQueueState = async (index: number, song: UserFavouritesTypes) => {
    try {
      if (data.favouriteData) {
        if (applicationQueue.data.screenId != screens.favouriteScreenId) {
          await TrackPlayer.reset()
          await TrackPlayer.add(data.favouriteData)
          await TrackPlayer.skip(index)
          await TrackPlayer.play()
          const newQueue: SpecificQueue = {
            screenId: screens.favouriteScreenId,
            isPlaying: true,
            song: song
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
  const shuffleHandler = async () => {
    if (!data.favouriteData.length) return
    const randomIndex = Math.floor(Math.random() * data.favouriteData.length)
    changeQueueState(randomIndex, data.favouriteData[randomIndex])
  }
  const simplePlayHandler = () => {
    if (!data.favouriteData.length) return
    changeQueueState(0, data.favouriteData[0])
  }
  return (
    <View className="w-full h-screen flex items-center justify-center pb-20 ">
      <FlatList
        data={data.favouriteData}
        keyExtractor={(item) => item.id}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={4}
        contentContainerStyle={{ paddingBottom: 80 }}
        removeClippedSubviews={true}
        windowSize={10}
        ListHeaderComponent={
          <FavouriteHeader
            total={data.favouriteData.length}
            shuffleHandler={shuffleHandler}
            simplePlayHandler={simplePlayHandler}
          />
        }
        renderItem={({ item, index }) => (
          <SongRow
            title={item.title}
            subtitle={item.artist}
            artwork={item.artwork}
            isActive={item.id === applicationQueue.data.song?.id}
            onPress={() => changeQueueState(index, item)}
          />
        )}
      />
    </View>
  )
}
export default memo(Favourites)
