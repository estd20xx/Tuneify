import React, { memo, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import {
  PlaylistResponse,
  PlayListSongList
} from "../../api/interface/module.interface"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"

import TrackPlayer from "react-native-track-player"
import { screens } from "../../api/base/constrants"
import { sanitize } from "../../services/sanitizer.service"
import {
  centralQueue,
  SpecificQueue,
  updateQueue
} from "../../store/slices/Queue.slice"
import { useGetPlaylistSongs } from "../../tanstack/query/useGetPlaylistSongs"
import Show from "../Common/Show"
import Header from "../DetailsScreen/Header"
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
  const { data: response, isLoading, isError } = useGetPlaylistSongs(data.id)
  const dispatch = useAppDispatch()
  const applicationQueue = TypedSelectorHook(centralQueue)
  const changeQueueState = async (index: number, song: PlayListSongList) => {
    try {
      if (response?.list) {
        if (
          applicationQueue.data.screenId !=
          screens.playlistScreenId.concat(response.id)
        ) {
          await TrackPlayer.reset()
          await TrackPlayer.add(sanitize.playList(response.list))
          await TrackPlayer.skip(index)
          await TrackPlayer.play()
          const newQueue: SpecificQueue = {
            screenId: screens.playlistScreenId + response.id,
            isPlaying: true,
            song: sanitize.playList([song])[0]
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
  return (
    <View className="w-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title={data.title}
          artwork={data.artwork[2].link}
          type={data.type}
        />
        <Show isVisible={isLoading}>
          <ActivityIndicator />
        </Show>
        <Show isVisible={isError}>
          <View className="w-full h-1/2 flex items-center justify-center">
            <Text>Something went wrong...</Text>
          </View>
        </Show>
        <Show isVisible={!isLoading && isError}>
          <FlatList
            data={response?.list}
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
                  onPress={() => changeQueueState(index, item)}
                >
                  <View className="w-4/5  h-full pl-3 flex flex-row ">
                    <View className="w-full rounded-lg overflow-hidden ">
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <Image
                          source={{
                            uri: item.image[1].link
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
                                item.id == applicationQueue.data.song?.id
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
                            {item.more_info.music}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className=" w-1/5 h-full flex items-center justify-end flex-row pr-3">
                    <Icons.MoreIcon
                      name="more-vert"
                      size={25}
                      color={"#bababa"}
                    />
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
