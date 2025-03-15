import React, { memo } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import TrackPlayer from "react-native-track-player"
import { screens } from "../api/base/constrants"
import FavouriteHeader from "../components/favourite/Header"
import { Icons } from "../constants/Icon"
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
    } catch (error) {
      console.log(error)
    }
  }
  const shuffleHandler = async () => {
    const randomIndex = Math.floor(Math.random() * data.favouriteData.length)
    changeQueueState(randomIndex, data.favouriteData[randomIndex])
  }
  const simplePlayHandler = () => {
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
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                width: "100%",
                height: 60,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 2,
                paddingRight: 5,
                marginTop: 10
              }}
              onPress={() => changeQueueState(index, item)}
            >
              <View className="w-[90%]  h-full pl-3 flex flex-row ">
                <View className="w-full rounded-lg overflow-hidden ">
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: item?.artwork }}
                      style={{ width: 60, height: 60, borderRadius: 17 }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          color:
                            item.id == applicationQueue.data.song?.id
                              ? "#16FF00"
                              : "white",
                          fontSize: 14,
                          fontFamily: "400"
                        }}
                      >
                        {item.title.slice(0, 40)}
                      </Text>
                      <Text
                        style={{
                          color: "#d0d0d1",
                          fontSize: 10,
                          marginTop: 1,
                          fontFamily: "300"
                        }}
                      >
                        {item.artist}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="w-[10%] h-full flex items-center justify-end flex-row pr-3">
                <Icons.MoreIcon name="more-vert" size={25} color={"#bababa"} />
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
export default memo(Favourites)
