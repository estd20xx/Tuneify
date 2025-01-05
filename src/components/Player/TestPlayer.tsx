import Slider from "@react-native-community/slider"
import React, { useEffect, useState } from "react"
import { Image, ScrollView, StatusBar, TouchableOpacity, View } from "react-native"
import Model from "react-native-modal"
import { Text } from "react-native-paper"
import TextTicker from "react-native-text-ticker"
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents
} from "react-native-track-player"
import { default as BackIcons, default as PlayPause } from "react-native-vector-icons/MaterialIcons"
import { lyricsApi } from "../../api/api"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import TuneifyService from "../../services/Tuneify.service"
import { addUserFavouritesData } from "../../store/slices/favourite.slice"
import { changeTunifyState, tunifyChild } from "../../store/slices/new/childState.slice"
import Messanger from "../message/Message"
const service = new TuneifyService(lyricsApi)
interface SongPlayerProps {
  isVisible: boolean
  setIsVisible: (cntx: boolean) => void
}
const TestPlayer: React.FC<SongPlayerProps> = ({ isVisible, setIsVisible }) => {
  const state = TypedSelectorHook(tunifyChild)
  const dispatch = useAppDispatch()
  const playbackState = usePlaybackState()
  const [value, setValue] = useState<number>(0)
  const [visibleSnake, setVisibleSnake] = useState<boolean>(false)
  const progress = useProgress()
  const [playing, setPlayi] = useState(false)
  const [ct, setCt] = useState<Track>()
  useEffect(() => {
    service.handleBottomCondition(setCt)
  }, [])
  useTrackPlayerEvents(service.getEvent(), async (event: any) => {
    if (playbackState.state == State.Ended) {
      dispatch(changeTunifyState())
    }
    if (event.state == State.Ready) {
      // TODO : need to handle lyrics api
      service.handleBottomCondition(setCt)
      // service.getLyrics(setLyric)
    }
  })
  return (
    <Model
      isVisible={isVisible}
      style={{ margin: 0 }}
      onBackButtonPress={() => setIsVisible(false)}
      className="bg-[#282828]"
    >
      <Messanger
        message="Added to Favourite."
        onDismis={() => setVisibleSnake(false)}
        isvisible={visibleSnake}
      />
      <StatusBar backgroundColor={"#282828"} />
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <View className="bg-[#151515] h-auto w-full">
          <View className="bg-[#282828] h-16 flex items-center justify-between flex-row px-5">
            <TouchableOpacity
              className="bg-[#333333] flex items-center justify-center rounded-md border"
              style={{
                width: 60,
                height: 40,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 1,
                elevation: 5
              }}
              onPress={() => setIsVisible(false)}
            >
              <BackIcons name="arrow-back" size={20} />
            </TouchableOpacity>
            <Text className="text-[#f9f9f9] text-base tracking-wider font-['300']">
              Now Playing
            </Text>
            <TouchableOpacity
              className="bg-[#333333] flex items-center justify-center rounded-md border"
              style={{
                width: 60,
                height: 40,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 1,
                elevation: 5
              }}
            >
              <BackIcons name="arrow-back" size={20} />
            </TouchableOpacity>
          </View>
          <View className="relative h-auto flex items-center mb-3">
            <View className="bg-[#282828] h-10 w-full absolute"></View>
            <View className="w-[85%] h-80 overflow-hidden">
              <Image
                source={{ uri: ct?.artwork ? ct.artwork : ct?.cover }}
                className="h-full w-full rounded-2xl"
                resizeMode="stretch"
              />
            </View>
          </View>
          <View className="bg-[#282828] h-32 rounded-t-3xl p-3">
            <View className="bg-[#151515] flex flex-row h-16 rounded-xl overflow-hidden p-1">
              <View className="w-[15%] p-1">
                <Image
                  source={{ uri: ct?.artwork ? ct.artwork : ct?.cover }}
                  className="h-full w-full rounded-xl"
                  resizeMode="cover"
                />
              </View>
              <View className="w-[60%] flex justify-center pl-1 pr-2">
                <TextTicker
                  className="text-gray-500 font-['300']"
                  duration={10000}
                  loop
                  bounce
                  repeatSpacer={50}
                  marqueeDelay={1000}
                >
                  {ct?.artist}
                </TextTicker>
                <Text className="text-gray-300 font-['300']">{ct?.title}</Text>
              </View>
              <View className="w-[24%] flex items-center justify-center">
                <TouchableOpacity className="bg-[#b9b9b9] py-2 px-5 rounded-xl">
                  <Text>Follow</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="w-full mt-2">
              <Slider
                minimumValue={0}
                maximumValue={progress.duration}
                value={progress.position}
                minimumTrackTintColor="#ff8216"
                maximumTrackTintColor="#d0d0d1"
                thumbTintColor="#ff8216"
                onSlidingComplete={(e) => TrackPlayer.seekTo(e)}
              />
              <View
                style={{
                  width: "90%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignSelf: "center"
                }}
              >
                <Text style={{ color: "white", fontFamily: "300" }}>
                  {JSON.stringify(Math.floor(progress.position / 60)).padStart(2, "0")}:
                  {JSON.stringify(Math.floor(progress.position % 60)).padStart(2, "0")}
                </Text>
                <Text style={{ color: "white", fontFamily: "300" }}>
                  {JSON.stringify(Math.floor(progress.duration / 60)).padStart(2, "0")}:
                  {JSON.stringify(Math.floor(progress.duration / 60)).padStart(2, "0")}
                </Text>
              </View>
            </View>
          </View>
          {/*  last part */}
          <View className="relative w-full bg-[#282828] mt-1 flex flex-row justify-between h-72">
            <View className="absolute h-full w-full flex items-center justify-center  text-white overflow-hidden">
              <View className="h-60 w-60 bg-[#181818]  rounded-full">
                {/* Play pause button */}
                <TouchableOpacity
                  className="bg-[#333333] top-[30%] left-[30%] flex items-center justify-center rounded-full border"
                  style={{
                    position: "absolute",
                    width: 100,
                    height: 100
                  }}
                  onPress={() => service.playPauseAction(playbackState, state, dispatch)}
                >
                  <PlayPause
                    name={state.isPlaying ? "pause" : "play-arrow"}
                    size={40}
                    color={"white"}
                  />
                </TouchableOpacity>

                <View className="absolute top-[35%] w-full h-20 flex flex-row justify-between items-center px-5">
                  <TouchableOpacity
                    onPress={() => [
                      TrackPlayer.skipToPrevious(),
                      service.handleBottomCondition(setCt)
                      // service.getLyrics(setLyric)
                    ]}
                  >
                    <Image
                      source={require("../../assets/images/previous.png")}
                      className="h-8 w-8"
                      tintColor={"white"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => [
                      TrackPlayer.skipToNext(),
                      service.handleBottomCondition(setCt)
                      // service.getLyrics(setLyric)
                    ]}
                  >
                    <Image
                      source={require("../../assets/images/forward.png")}
                      className="h-8 w-8"
                      tintColor={"white"}
                    />
                  </TouchableOpacity>
                </View>
                <View className=" absolute left-[35%] w-20 h-full flex items-center justify-between py-5">
                  <TouchableOpacity
                    onPress={() => [dispatch(addUserFavouritesData(ct!)), setVisibleSnake(true)]}
                  >
                    <Icons.HomeIcon name="heart-fill" size={26} color={"#ff8216"} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <BackIcons name="arrow-back" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="flex justify-between py-5 ml-4">
              <TouchableOpacity
                className="bg-[#333333] flex items-center justify-center rounded-full border"
                style={{
                  width: 70,
                  height: 70
                }}
              >
                <BackIcons name="arrow-back" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#333333] flex items-center justify-center rounded-full border"
                style={{
                  width: 70,
                  height: 70
                }}
                onPress={() => service.repeatMode(state, dispatch)}
              >
                <Icons.PlayListIcon
                  name={state.repeat ? "repeat" : "repeat-off"}
                  color={state.repeat ? "#ff8216" : "#bababa"}
                  size={23}
                />
              </TouchableOpacity>
            </View>
            <View className="flex justify-between py-5 mr-4">
              <TouchableOpacity
                className="bg-[#333333] flex items-center justify-center rounded-full border"
                style={{
                  width: 70,
                  height: 70,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 1,
                  elevation: 5
                }}
              >
                <BackIcons name="arrow-back" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#333333] flex items-center justify-center rounded-full border"
                style={{
                  width: 70,
                  height: 70,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 1,
                  elevation: 5
                }}
              >
                <BackIcons name="arrow-back" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Lyrics */}
      </ScrollView>
    </Model>
  )
}

export default TestPlayer
