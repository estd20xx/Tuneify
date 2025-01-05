import React, { memo, useEffect, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { PlaylistResponse } from "../../api/interface/module.interface"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { playlistDetails } from "../../store/actions/playlist.action"
import { playListDetailsStore } from "../../store/slices/new/playlistDetails.slice"
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
const PlaylistDetails: React.FC<PlaylistDetailsTypes> = ({ route }) => {
  const [data, setData] = useState(route.params.playlistData)
  const dispatch = useAppDispatch()
  const playlistStore = TypedSelectorHook(playListDetailsStore)
  useEffect(() => {
    dispatch(playlistDetails.getPlaylistsSongs(data.id))
  }, [])
  return (
    <View className="w-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full h-56  flex items-center justify-center">
          <Image source={{ uri: data.artwork[2].link }} className="h-52 w-52 rounded-md" />
        </View>
        <View className="w-full px-3 flex  justify-center">
          <Text className="text-white  text-lg tracking-wider font-['500']">
            {data.title.length > 15 ? data.title.slice(0, 38) + "..." : data.title}
          </Text>
          <TouchableOpacity>
            <Text className="text-gray-300 text-base font-['400']">{data.type}</Text>
          </TouchableOpacity>
        </View>
        {playlistStore.data?.list.map((currentSong) => {
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
            >
              <View className="w-4/5  h-full pl-3 flex flex-row ">
                <View className="w-full rounded-lg overflow-hidden ">
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: currentSong.image[1].link }}
                      style={{ width: 60, height: 60, borderRadius: 5 }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          color: "white",
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
                        {currentSong.more_info.music}
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
export default memo(PlaylistDetails)
