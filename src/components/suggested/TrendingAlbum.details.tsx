import React, { memo, useCallback, useEffect, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import TrackPlayer from "react-native-track-player"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { TrendingAlbumParamsTypes } from "../../Interfaces/album.interface"
import { album } from "../../store/actions/album.action"
import { albumData } from "../../store/slices/album.slice"
import {
  addTrackId,
  addTrackIndex,
  tunifyCurrentTrack
} from "../../store/slices/currentTrack.slice"
import { tuneifySongs } from "../../store/slices/song.slice"
const TrendingAlbumDetails: React.FC<TrendingAlbumParamsTypes> = ({ route }) => {
  const dispatch = useAppDispatch()
  const current = TypedSelectorHook(tunifyCurrentTrack)
  const [data] = useState(route.params.albumData)
  const storeSongs = TypedSelectorHook(tuneifySongs)
  const albumSongs = TypedSelectorHook(albumData)
  useEffect(() => {
    dispatch(album.getAlbumSongs(route.params.albumData.id))
  }, [])
  // useEffect(() => {
  //   if (albumSongs?.songs.length != 0) {
  //     // @ts-ignore
  //     dispatch(addSongList(albumSongs))
  //   }
  // }, [albumSongs])
  console.log("trending albm details")
  const InitialiseThisOne = useCallback(
    async (index: number) => {
      console.log(current.trackId)
      console.log(data.id)
      try {
        if (current.trackId == data.id) {
          await TrackPlayer.skip(index)
          dispatch(addTrackIndex(index))
        } else {
          await TrackPlayer.reset()
          await TrackPlayer.setQueue(storeSongs.songs)
          await TrackPlayer.skip(index)
          await TrackPlayer.play()
          dispatch(addTrackId(data.id), addTrackIndex(index))
        }
      } catch (error) {
        console.log(error)
      }
    },
    [storeSongs.songs, current.trackId]
  )
  return (
    <View className="w-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full h-56  flex items-center justify-center">
          <Image source={{ uri: data.artwork[2].link }} className="h-52 w-52 rounded-md" />
        </View>
        <View className="w-full px-3 flex  justify-center">
          <Text className="text-white font-['500'] text-lg tracking-wider">
            {data.title.length > 15 ? data.title.slice(0, 38) + "..." : data.title}
          </Text>
          <TouchableOpacity>
            <Text className="text-gray-300 text-base font-['400']">{data.type}</Text>
          </TouchableOpacity>
        </View>
        {!albumSongs.isLoading &&
          albumSongs?.data?.songs.map((currentSong, index) => {
            return (
              <TouchableOpacity
                key={currentSong.id}
                style={{
                  width: "100%",
                  height: 60,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 2,
                  paddingRight: 5,
                  marginTop: 10
                }}
                onPress={() => InitialiseThisOne(index)}
              >
                <View className="w-4/5  h-full pl-3 flex flex-row ">
                  <View className="w-full rounded-lg overflow-hidden ">
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image
                        source={{ uri: currentSong.image[2].link }}
                        style={{ width: 60, height: 60, borderRadius: 5 }}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            color: "#FFF",
                            fontSize: 14,
                            fontFamily: "400"
                          }}
                        >
                          {currentSong.title}
                        </Text>
                        <Text
                          style={{
                            color: "#d0d0d1",
                            fontSize: 10,
                            marginTop: 2,
                            fontFamily: "300"
                          }}
                        >
                          {currentSong.artists}
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
          })}
      </ScrollView>
    </View>
  )
}
export default memo(TrendingAlbumDetails)
