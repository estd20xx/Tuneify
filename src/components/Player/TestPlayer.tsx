import Slider from "@react-native-community/slider"
import React, { useEffect, useState } from "react"
import { Image, StatusBar, TouchableOpacity, View } from "react-native"
import Model from "react-native-modal"
import { Text } from "react-native-paper"
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
import { changeTunifyState, tunifyChild } from "../../store/slices/childState.slice"
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
    >
      <StatusBar backgroundColor={"#282828"} />
      <View className="bg-[#151515] h-screen w-full">
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
          >
            <BackIcons name="arrow-back" size={20} />
          </TouchableOpacity>
          <Text className="text-[#f9f9f9] text-base tracking-wider">Now Playing</Text>
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
        <View className="bg-[#282828] h-[16%] rounded-t-3xl p-3">
          <View className="bg-[#151515] flex flex-row h-16 rounded-xl overflow-hidden p-1">
            <View className="w-[15%] p-1">
              <Image
                source={{ uri: ct?.artwork ? ct.artwork : ct?.cover }}
                className="h-full w-full rounded-xl"
                resizeMode="cover"
              />
            </View>
            <View className="w-[68%] flex justify-center pl-1">
              <Text className="text-gray-500">The Velvel UnderGround</Text>
              <Text className="text-gray-300">Sunday Morning</Text>
            </View>
            <View className="w-[15%] flex items-center justify-center">
              <TouchableOpacity className="bg-[#b9b9b9] py-2 px-5 rounded-xl">
                <Icons.HomeIcon name="heart-fill" size={18} color={"#ff8216"} />
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
        <View className="relative  w-full bg-[#282828] mt-1 flex flex-row justify-between p-3 h-[38%]">
          <View className="absolute h-64 w-64 left-20 top-7 rounded-full  bg-[#181818] text-white overflow-hidden">
            <View className=" relative  h-full w-full">
              <TouchableOpacity
                className="bg-[#333333] top-[30%] left-[30%] flex items-center justify-center rounded-full border"
                style={{
                  position: "absolute",
                  width: 100,
                  height: 100,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 1,
                  elevation: 5,
                  zIndex: 22
                }}
                onPress={() => service.playPauseAction(playbackState, state, dispatch)}
              >
                <PlayPause
                  name={state.isPlaying ? "pause" : "play-arrow"}
                  size={30}
                  color={"white"}
                />
              </TouchableOpacity>

              <View className=" absolute top-[35%] w-full h-20 flex flex-row justify-between items-center px-5">
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
              <View className=" absolute left-[35%] w-20 h-full flex items-center justify-between py-3">
                <TouchableOpacity>
                  <BackIcons name="arrow-back" size={20} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <BackIcons name="arrow-back" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="flex justify-between pb-3">
            <TouchableOpacity
              className="bg-[#333333] flex items-center justify-center rounded-full border"
              style={{
                width: 79,
                height: 79,
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
                width: 79,
                height: 79,
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
          <View className="flex justify-between pb-3">
            <TouchableOpacity
              className="bg-[#333333] flex items-center justify-center rounded-full border"
              style={{
                width: 79,
                height: 79,
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
                width: 79,
                height: 79,
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
    </Model>
  )
}

export default TestPlayer
