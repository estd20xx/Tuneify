import React, { memo, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { PlaylistResponse } from "../../api/interface/module.interface"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { playlistDetails } from "../../store/actions/playlist.action"
import { playListDetailsStore } from "../../store/slices/new/playlistDetails.slice"
import Header from "../DetailsScreen/Header"
import Show from "../Show"
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
  const [data] = useState(route.params.playlistData)
  const dispatch = useAppDispatch()
  const playlistStore = TypedSelectorHook(playListDetailsStore)
  useEffect(() => {
    if (data.id) {
      dispatch(playlistDetails.getPlaylistsSongs(data.id))
    }
  }, [data.id])
  return (
    <View className="w-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={data.title} artwork={data.artwork[2].link} type={data.type} />
        <Show isVisible={playlistStore.isLoading}>
          <ActivityIndicator />
        </Show>
        <Show isVisible={!playlistStore.isLoading}>
          <FlatList
            data={playlistStore.data?.list}
            keyExtractor={(item, index) => item.id}
            initialNumToRender={3}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={4}
            contentContainerStyle={{ paddingBottom: 80 }}
            removeClippedSubviews={true}
            windowSize={10}
            scrollEnabled={false}
            renderItem={({ item }) => {
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
                >
                  <View className="w-4/5  h-full pl-3 flex flex-row ">
                    <View className="w-full rounded-lg overflow-hidden ">
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FastImage
                          source={{
                            uri: item.image[1].link,
                            priority: FastImage.priority.high
                          }}
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
                            {item.more_info.music}
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
export default memo(PlaylistDetails)
