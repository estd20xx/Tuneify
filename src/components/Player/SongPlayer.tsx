import Slider from "@react-native-community/slider"
import React, { memo, useCallback, useEffect, useState } from "react"
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents
} from "react-native-track-player"
import { screens } from "../../api/base/constrants"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { getSongsLyrics } from "../../store/actions/lyrics.action"
import { addUserFavouritesData, tuneifyFavourites } from "../../store/slices/favourite.slice"
import { storedLyrics } from "../../store/slices/lyrics.slice"
import { centralQueue, updateSongQueue } from "../../store/slices/Queue.slice"
import Show from "../Common/Show"
import Control from "./Control"
import SongInfo from "./SongInfo"
import TimerPopUp from "./TimerPopUp"
interface SongPlayerProps {
  isVisible: boolean
  setIsVisible: (cntx: boolean) => void
}
const SongPlayer: React.FC<SongPlayerProps> = ({ isVisible, setIsVisible }) => {
  const favourite = TypedSelectorHook(tuneifyFavourites)
  const applicationQueue = TypedSelectorHook(centralQueue)
  const lyrics = TypedSelectorHook(storedLyrics)
  const dispatch = useAppDispatch()
  const [isFlipped, setIsFlipped] = useState(false)
  const [flip, setFlip] = useState(new Animated.Value(0))
  const [vtimer, setVtimer] = useState(false)
  const [isTimer, setIsTimer] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<StoreSongTypes>()
  const playbackState = usePlaybackState()
  const [value, setValue] = useState<number>(0)
  const [downloadProgress, setDownloadProgress] = useState<number>(0)
  const progress = useProgress()
  const flipCard = useCallback(() => {
    Animated.timing(flip, {
      toValue: isFlipped ? 0 : 180,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      setIsFlipped(!isFlipped)
    })
  }, [isFlipped])
  const frontInterpolate = flip.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"]
  })
  const backInterpolate = flip.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"]
  })
  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }]
  }
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }]
  }
  useEffect(() => {
    if (applicationQueue.data.song) {
      setCurrentTrack(applicationQueue.data.song)
    }
  }, [applicationQueue])
  const nextAndPrevious = async (isNext: boolean) => {
    isNext ? await TrackPlayer.skipToNext() : await TrackPlayer.skipToPrevious()
  }
  const checkFavAvailable = (currentId: string): boolean => {
    const data = favourite.favouriteData.filter((liked: any) => liked.id == currentId)
    if (data.length > 0) return false
    return true
  }
  const downloadSong = async (c: StoreSongTypes) => {
    try {
    } catch (error) {
      console.log("Eroor downloading song...")
    }
  }
  useTrackPlayerEvents(
    [Event.PlaybackState, Event.PlaybackError, Event.PlaybackState, Event.PlaybackError],
    async (event: any) => {
      if (event.state == State.Loading) {
        const activeTrack = await TrackPlayer.getActiveTrack()
        setCurrentTrack(activeTrack as StoreSongTypes)
        dispatch(updateSongQueue(activeTrack as StoreSongTypes))
        if (applicationQueue.data?.screenId != screens.offline)
          dispatch(getSongsLyrics(activeTrack?.id))
      }
    }
  )

  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
      onBackButtonPress={() => setIsVisible(false)}
    >
      <TimerPopUp
        vtimer={vtimer}
        value={value}
        setValue={setValue}
        setIsTimer={setIsTimer}
        setVtimer={setVtimer}
        dispatch={dispatch}
      />
      {/* #181a20 */}
      <View className="w-full h-screen px-3 bg-[#181a20]">
        <View className="h-10 w-full flex items-center justify-between flex-row">
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <Icons.KeyboardDown name="keyboard-arrow-down" size={35} color={"white"} />
          </TouchableOpacity>
          <View className="flex flex-row h-full items-center justify-center">
            <TouchableOpacity onPress={() => flipCard()}>
              <Icons.MoreIcon name="lyrics" size={20} color={"white"} className="mr-4" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icons.MoreIcon name="more-vert" size={25} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="relative h-1/2 w-full mt-6 flex items-center justify-center">
          <Animated.View
            style={[frontAnimatedStyle, { backfaceVisibility: "hidden" }]}
            className="w-[90%]  overflow-hidden"
          >
            <Image
              className="h-full w-full rounded-xl"
              source={{
                uri: currentTrack?.artwork
              }}
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.View
            style={[backAnimatedStyle, { backfaceVisibility: "hidden" }]}
            className="flex absolute  w-[95%] h-full  justify-center items-center rounded-xl  "
          >
            <Show isVisible={lyrics.data.lyrics?.length > 15}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text className="text-white text-base  leading-8 flex items-center justify-center font-['300']">
                  {lyrics.data.lyrics?.replaceAll("<br>", "\n")}
                </Text>
              </ScrollView>
            </Show>
            <Show isVisible={lyrics.data.lyrics?.length < 15}>
              <Text className="absolute top-52 left-0 ">{lyrics.data.lyrics}</Text>
            </Show>
          </Animated.View>
        </View>
        <SongInfo currentTrack={currentTrack} />
        <View className="w-full  mt-5 py-2">
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
        <Control
          nextAndPrevious={nextAndPrevious}
          isRepeat={applicationQueue.isRepeat}
          playbackState={playbackState}
          applicationQueue={applicationQueue}
          dispatch={dispatch}
        />

        <View className=" h-14 w-full mt-5  flex items-center justify-around flex-row">
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/tes/Timer-repeat.png")}
              style={{ width: 28, height: 28, tintColor: "white" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => [setVtimer(!vtimer)]}>
            <Image
              source={require("../../assets/images/tes/Timer.png")}
              style={{
                width: 32,
                height: 32,
                tintColor: isTimer ? "#ff8216" : "white"
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => downloadSong(currentTrack!)}>
            <Icons.MoreIcon name="download" size={23} color={"green"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => [dispatch(addUserFavouritesData(currentTrack!))]}>
            <Icons.HomeIcon
              name="heart-fill"
              size={23}
              color={checkFavAvailable(currentTrack?.id || "") ? "gray" : "#ff8216"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
export default memo(SongPlayer)
