import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native"
import React, {useEffect, useState} from "react"
import axios from "axios"
import {baseApi} from "../../api/api"
import {Icons} from "../../constants/Icon"
import {TypedSelectorHook, useAppDispatch} from "../../hooks/store.hook"
import {addSongList, tuneifySongs} from "../../store/slices/song.slice"
import TrackPlayer from "react-native-track-player"
import {TrendingAlbumTypes} from "../../Interfaces/album.interface"
interface TrendingAlbumData {
  key: string
  name: string
  params: {
    albumData: TrendingAlbumTypes
  }
}
export interface TrendingAlbumParamsTypes {
  route: TrendingAlbumData
}
const TrendingAlbumDetails: React.FC<TrendingAlbumParamsTypes> = ({route}) => {
  const dispatch = useAppDispatch()
  const [data, setData] = useState(route.params.albumData)
  const storeSongs = TypedSelectorHook(tuneifySongs)
  const [albumSongs, setAlbumSongs] = useState<TrendingAlbumTypes[]>([])
  const fetchAudio = async () => {
    try {
      const albumData = await axios.get(`${baseApi}albums?id=${data.id}`)
      setAlbumSongs(albumData.data.data.songs)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAudio()
  }, [])
  useEffect(() => {
    if (albumSongs.length > 0) {
      // @ts-ignore
      dispatch(addSongList(albumSongs))
    }
  }, [albumSongs])
  useEffect(() => {
    if (storeSongs.songs.length > 0) {
      TrackPlayer.setQueue(storeSongs.songs)
    }
  }, [storeSongs.songs])
  return (
    <View className="w-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full h-56  flex items-center justify-center">
          <Image
            source={{uri: data.image[2].link}}
            className="h-52 w-52 rounded-md"
          />
        </View>
        <View className="w-full px-3 flex  justify-center">
          <Text className="text-white font-[500] text-lg tracking-wider">
            {data.name.length > 15 ? data.name.slice(0, 38) + "..." : data.name}
          </Text>
          <TouchableOpacity>
            <Text className="text-gray-300 text-base font-[400]">
              {data.artists[0].name}
            </Text>
          </TouchableOpacity>
        </View>
        {albumSongs.map(currentSong => {
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
                marginTop: 10,
              }}>
              <View className="w-4/5  h-full pl-3 flex flex-row ">
                <View className="w-full rounded-lg overflow-hidden ">
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image
                      source={{uri: currentSong.image[2].link}}
                      style={{width: 60, height: 60, borderRadius: 5}}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          fontFamily: "400",
                        }}>
                        {currentSong.name}
                      </Text>
                      <Text
                        style={{
                          color: "#d0d0d1",
                          fontSize: 10,
                          marginTop: 2,
                          fontFamily: "300",
                        }}>
                        {currentSong.primaryArtists}
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

export default TrendingAlbumDetails
