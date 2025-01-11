import React, { memo, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import TrackPlayer from "react-native-track-player"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { TrendingAlbumParamsTypes } from "../../Interfaces/album.interface"
import { sanitize } from "../../services/sanitizer.service"
import { album } from "../../store/actions/album.action"
import { albumData } from "../../store/slices/album.slice"
import {
  centralQueue,
  SpecificQueue,
  updateQueue,
  updateSongQueue
} from "../../store/slices/Queue.slice"
import Show from "../Common/Show"
import Header from "../DetailsScreen/Header"
const screenId = "trendingAblum"
const TrendingAlbumDetails: React.FC<TrendingAlbumParamsTypes> = ({ route }) => {
  const dispatch = useAppDispatch()
  const [data] = useState(route.params.albumData)
  const albumSongs = TypedSelectorHook(albumData)
  const applicationQueue = TypedSelectorHook(centralQueue)
  useEffect(() => {
    dispatch(album.getAlbumSongs(route.params.albumData.id))
  }, [])
  const chnageQueueState = async (index: number) => {
    try {
      if (applicationQueue.data?.id != screenId + data.id) {
        if (albumSongs.data?.songs) {
          const refactoredPrev = sanitize.albumDetails(albumSongs.data.songs.slice(0, index))
          const refactoredCurrent = sanitize.albumDetails(
            albumSongs.data?.songs.slice(index, index + 1)
          )
          const refactoredNext = sanitize.albumDetails(albumSongs.data?.songs.slice(index + 1))
          await TrackPlayer.reset()
          await TrackPlayer.add(refactoredCurrent)
          await TrackPlayer.add(refactoredNext)
          await TrackPlayer.add(refactoredPrev)
          await TrackPlayer.play()
          const newQueue: SpecificQueue = {
            id: screenId + data.id,
            currentSongIndex: index,
            isPlaying: true,
            currentSongId: refactoredCurrent[0].id,
            songs: [...refactoredPrev, ...refactoredCurrent, ...refactoredNext]
          }
          dispatch(updateQueue(newQueue))
        }
        return
      }
      if (albumSongs.data?.songs) {
        const clickedSong = albumSongs.data.songs[index]
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
    <View className="w-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={data.title} artwork={data.artwork[2].link} type={data.type} />
        <Show isVisible={albumSongs.isLoading}>
          <ActivityIndicator />
        </Show>
        <Show isVisible={!albumSongs.isLoading && albumSongs?.data != null}>
          <FlatList
            data={albumSongs.data?.songs}
            keyExtractor={(item) => item.id}
            initialNumToRender={3}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={4}
            contentContainerStyle={{ paddingBottom: 80 }}
            removeClippedSubviews={true}
            windowSize={10}
            scrollEnabled={false}
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
                  onPress={() => chnageQueueState(index)}
                >
                  <View className="w-4/5  h-full pl-3 flex flex-row ">
                    <View className="w-full rounded-lg overflow-hidden ">
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <FastImage
                          source={{
                            uri: item.image[1].link,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.immutable
                          }}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 5
                          }}
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              color:
                                item.id == applicationQueue.data?.currentSongId
                                  ? "#16FF00"
                                  : "white",
                              fontSize: 14,
                              fontFamily: "400"
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              color: "#d0d0d1",
                              fontSize: 10,
                              marginTop: 2,
                              fontFamily: "300"
                            }}
                          >
                            {item.artists}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className=" w-1/5 h-full flex items-center justify-end flex-row pr-3">
                    <Icons.MoreIcon name="more-vert" size={25} color={"#bababa"} />
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </Show>
      </ScrollView>
    </View>
  )
}
export default memo(TrendingAlbumDetails)
