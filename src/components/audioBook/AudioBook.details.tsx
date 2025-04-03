import React, { memo, useEffect } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import TrackPlayer from "react-native-track-player"
import { audioBookImageBaseUrl, screens } from "../../api/base/constrants"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { Docs } from "../../screens/Home/AudioBook"
import { audioBookDetails } from "../../store/actions/audioBookDetails.action"
import { audioBookDetailsWithChapters } from "../../store/slices/audioBookDetails.slice"
import {
  centralQueue,
  SpecificQueue,
  updateQueue
} from "../../store/slices/Queue.slice"
import Show from "../Common/Show"
import Header from "../DetailsScreen/Header"
interface AudioBookData {
  key: string
  name: string
  params: {
    audios: Docs
  }
}
export interface AudioBookDetailsProps {
  route: AudioBookData
}
const AudioBookDetails: React.FC<AudioBookDetailsProps> = ({ route }) => {
  const { audios } = route.params
  const dispatch = useAppDispatch()
  const audioBookChapters = TypedSelectorHook(audioBookDetailsWithChapters)
  const applicationQueue = TypedSelectorHook(centralQueue)

  const changeQueueState = async (index: number, song: StoreSongTypes) => {
    try {
      if (audioBookChapters.data) {
        if (applicationQueue.data.screenId != screens.favouriteScreenId) {
          await TrackPlayer.reset()
          await TrackPlayer.add(audioBookChapters.data)
          await TrackPlayer.skip(index)
          await TrackPlayer.play()
          const newQueue: SpecificQueue = {
            screenId: screens.audioBook,
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

  useEffect(() => {
    dispatch(
      audioBookDetails.getAudioBookDetails({
        identifier: audios.identifier,
        creator: audios.creator
      })
    )
  }, [])
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header
        title={audios.title}
        artwork={audioBookImageBaseUrl.concat(audios.identifier)}
        type={"Audio Book"}
        desc={audios.description}
      />
      <Show isVisible={audioBookChapters.isLoading}>
        <ActivityIndicator className="mt-5" />
      </Show>
      <Show
        isVisible={
          !audioBookChapters.isLoading && audioBookChapters?.data != null
        }
      >
        <FlatList
          data={audioBookChapters.data}
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
                className="w-full h-16 mt-2 flex flex-row items-center"
                onPress={() => changeQueueState(index, item)}
              >
                <View className="h-16 w-20  pl-2">
                  <Image
                    source={{
                      uri: audioBookImageBaseUrl.concat(audios.identifier)
                    }}
                    className="h-16 w-16"
                    style={{
                      borderRadius: 17
                    }}
                  />
                </View>
                <View className="w-4/5 ">
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
                    {item.title.slice(0, 50)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#d0d0d1",
                      fontFamily: "200"
                    }}
                  >
                    {item.artist}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </Show>
    </ScrollView>
  )
}
export default memo(AudioBookDetails)
