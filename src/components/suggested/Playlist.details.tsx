import {View, Text, Image, ScrollView, TouchableOpacity} from "react-native"
import React, {useEffect, useState} from "react"
import axios from "axios"
import {baseApi} from "../../api/api"
import {Icons} from "../../constants/Icon"
import {SongsTypes} from "../../Interfaces/songs.interface"
import {PlaylistResponse} from "../../api/interface/module.interface"
interface PlaylistData {
  key: string
  name: string
  params: {
    playlistData: PlaylistResponse
  }
}
export interface PlaylistDetailsTypes {
  route: PlaylistData
}
const PlaylistDetails: React.FC<PlaylistDetailsTypes> = ({route}) => {
  console.log("called")
  const [data, setData] = useState(route.params.playlistData)
  const [playlistSong, setPlaylistSongs] = useState<SongsTypes[]>([])
  const fetchAudio = async () => {
    try {
      const PlaylistData = await axios.get(`${baseApi}playlists?id=${data.id}`)
      setPlaylistSongs(PlaylistData.data.data.songs)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAudio()
  }, [])
  return (
    <View className="w-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full h-56  flex items-center justify-center">
          <Image
            source={{uri: data.artwork[2].link}}
            className="h-52 w-52 rounded-md"
          />
        </View>
        <View className="w-full px-3 flex  justify-center">
          <Text className="text-white  text-lg tracking-wider font-['500']">
            {data.title.length > 15
              ? data.title.slice(0, 38) + "..."
              : data.title}
          </Text>
          <TouchableOpacity>
            <Text className="text-gray-300 text-base font-['400']">Random</Text>
          </TouchableOpacity>
        </View>
        {playlistSong.map(currentSong => {
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
export default PlaylistDetails
