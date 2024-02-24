import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native"
import React, {useEffect, useState} from "react"
import {TrendingAlbumTypes} from "../../Types/Types"
import axios from "axios"
import {baseApi} from "../../api/api"
import {Icons} from "../../constants/Icon"
import {TypedSelectorHook, useAppDispatch} from "../../hooks/store.hook"
import {TuneifyData, addSongList} from "../../store/Tuneify"
import {StoreSong} from "../../Interfaces/tuneifySlice.interface"
import TrackPlayer from "react-native-track-player"

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
  const dataa = TypedSelectorHook(TuneifyData)
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
  // useEffect(() => {
  //     if (albumSongs.length > 0) {
  //         dispatch(addSongList(albumSongs))
  //     }
  // }, [albumSongs])
  useEffect(() => {
    if (dataa.storeSong.length > 0) {
      TrackPlayer.setQueue(dataa.storeSong)
    }
  }, [dataa.storeSong])
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
          <Text className="text-white font-bold text-lg tracking-wider">
            {data.name.length > 15 ? data.name.slice(0, 38) + "..." : data.name}
          </Text>
          <TouchableOpacity>
            <Text className="text-gray-300 text-base">
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
                      <Text style={{color: "white", fontSize: 14}}>
                        {currentSong.name}
                      </Text>
                      <Text
                        style={{color: "#d0d0d1", fontSize: 10, marginTop: 2}}>
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
