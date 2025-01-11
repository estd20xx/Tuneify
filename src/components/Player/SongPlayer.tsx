import Slider from "@react-native-community/slider"
import React, { memo, useCallback, useEffect, useState } from "react"
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import TrackImage from "react-native-fast-image"
import fs from "react-native-fs"
import Modal from "react-native-modal"
import { FAB as Fab } from "react-native-paper"
import GestureRecognizer from "react-native-swipe-gestures"
import TextTicker from "react-native-text-ticker"
import TrackPlayer, { State, usePlaybackState, useProgress } from "react-native-track-player"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { applicationService } from "../../services/Tuneify.service"
import { addUserFavouritesData, tuneifyFavourites } from "../../store/slices/favourite.slice"
import { centralQueue, updateSongQueue } from "../../store/slices/Queue.slice"
import Show from "../Common/Show"
interface SongPlayerProps {
  isVisible: boolean
  setIsVisible: (cntx: boolean) => void
}
const SongPlayer: React.FC<SongPlayerProps> = ({ isVisible, setIsVisible }) => {
  const favourite = TypedSelectorHook(tuneifyFavourites)
  const applicationQueue = TypedSelectorHook(centralQueue)
  const dispatch = useAppDispatch()
  const [isFlipped, setIsFlipped] = useState(false)
  const [flip, setFlip] = useState(new Animated.Value(0))
  const [vtimer, setVtimer] = useState(false)
  const [isTimer, setIsTimer] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<StoreSongTypes>()
  const [lyric, setLyric] = useState<string>("We are working on it.! 💻")
  const playbackState = usePlaybackState()
  const [value, setValue] = useState<number>(0)
  const [visibleSnake, setVisibleSnake] = useState<boolean>(false)
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
    if (applicationQueue.data?.songs) {
      setCurrentTrack(applicationQueue.data.songs[applicationQueue.data.currentSongIndex])
    }
  }, [applicationQueue])
  const nextAndPrevious = async (isNext: boolean) => {
    let index: number = 0
    if (applicationQueue.data) {
      if (isNext) {
        index = (applicationQueue.data?.currentSongIndex + 1) % applicationQueue.data.songs.length
        dispatch(updateSongQueue({ index, id: applicationQueue.data.songs[index].id }))
        await TrackPlayer.skip(index)
        return
      }
      index =
        (applicationQueue.data?.currentSongIndex + applicationQueue.data.songs.length - 1) %
        applicationQueue.data.songs.length
      dispatch(updateSongQueue({ index, id: applicationQueue.data.songs[index].id }))
      await TrackPlayer.skip(index)
    }
  }

  const checkFavAvailable = (id: string): boolean => {
    const data = favourite.favouriteData.filter((c) => c.id == id)
    if (data.length > 0) return false
    return true
  }
  const downloadSong = async (c: StoreSongTypes) => {
    try {
      const downloadDest = `${fs.DownloadDirectoryPath}/${c.title.replaceAll(" ", "-")}.mp3`
      fs.downloadFile({
        fromUrl: c.url,
        toFile: downloadDest,
        progress: (p: fs.DownloadProgressCallbackResult) => {
          setDownloadProgress(Math.floor((p.bytesWritten / p.contentLength) * 100))
        }
      })
        .promise.then((res) => {
          console.log("File downloaded:", res)
        })
        .catch((err) => {
          console.log(err.message)
        })
    } catch (error) {
      console.log("Eroor downloading song...")
    }
  }
  return (
    <GestureRecognizer onSwipeDown={() => setIsVisible(false)} style={{ flex: 1 }}>
      <Modal
        isVisible={isVisible}
        style={{ margin: 0 }}
        onBackButtonPress={() => setIsVisible(false)}
      >
        <Show isVisible={vtimer}>
          <View className="h-48  w-4/5 bg-red-500  absolute z-50 m-auto left-12 rounded-3xl flex items-center justify-center">
            <Slider
              style={{ width: "100%" }}
              minimumValue={0}
              maximumValue={60}
              value={value}
              minimumTrackTintColor="#181a20"
              maximumTrackTintColor="white"
              thumbTintColor="#181a20"
              onSlidingComplete={(e) => setValue(Math.floor(e))}
            />
            <Text className="text-white text-xl mt-3 font-['500']">{value}</Text>
            <TouchableOpacity
              className="mt-8 bg-fuchsia-500 px-16 py-3 rounded-md"
              onPress={() => [
                setIsTimer(true),
                applicationService.timerMusicOff(value, dispatch, setIsTimer),
                setVtimer(!vtimer)
              ]}
            >
              <Text className="text-white text-lg font-['400']">Set</Text>
            </TouchableOpacity>
          </View>
        </Show>

        <View style={{ flex: 1, backgroundColor: "#181a20" }}>
          <View className="w-full h-screen  px-3 ">
            <View className=" h-10 w-full flex items-center justify-between flex-row">
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
            <View className="relative h-1/2 w-full flex items-center justify-center  ">
              <Animated.View
                style={[frontAnimatedStyle, { backfaceVisibility: "hidden" }]}
                className=" w-[90%]  h-96   rounded-3xl overflow-hidden"
              >
                <TrackImage
                  source={{
                    uri: currentTrack?.artwork,
                    headers: { Authorization: "songs" },
                    priority: TrackImage.priority.high,
                    cache: TrackImage.cacheControl.immutable
                  }}
                  className="h-full w-full "
                />
              </Animated.View>
              <Animated.View
                style={[backAnimatedStyle, { backfaceVisibility: "hidden" }]}
                className="flex absolute   w-[95%] h-full   justify-center items-center rounded-xl "
              >
                <Show isVisible={lyric.length > 15}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text className="text-white text-base min-h-[100px]  leading-8 px-5 flex items-center justify-center font-['300']  ">
                      {lyric}
                    </Text>
                  </ScrollView>
                </Show>
                <Show isVisible={lyric.length < 15}>
                  <Text className="absolute top-52 left-0 ">{lyric}</Text>
                </Show>
              </Animated.View>
            </View>
            <View className=" w-full mt-5 flex items-center justify-center h-auto ">
              <TextTicker
                duration={20000}
                loop
                repeatSpacer={50}
                marqueeDelay={3000}
                animationType="scroll"
                className="text-gray-300 text-xl  font-['600'] mb-1"
              >
                {currentTrack?.title}
              </TextTicker>
              <TextTicker
                style={{ fontSize: 15, color: "#bdbdbd" }}
                className="font-['300']"
                duration={10000}
                loop
                bounce
                repeatSpacer={50}
                marqueeDelay={1000}
              >
                {currentTrack?.artist}
              </TextTicker>
            </View>
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

            <View className=" h-18  w-full flex items-center justify-evenly flex-row mt-3 px">
              <View className="h-full w-2/5 flex items-center flex-row justify-around pl-2">
                <TouchableOpacity onPress={() => nextAndPrevious(false)}>
                  <Icons.KeyboardDown name="skip-previous" color={"white"} size={35} />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  onPress={() => applicationService.timerSkip(progress.position, false)}
                >
                  <Image
                    source={require("../../assets/images/tes/icons8-replay-10-64.png")}
                    style={{
                      tintColor: "white",
                      height: "60%",
                      width: "60%",
                      marginRight: 6
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View className=" w-1/5 flex items-center justify-center">
                <Fab
                  icon={applicationQueue.data?.isPlaying ? "pause" : "play"}
                  onPress={() =>
                    applicationService.playPauseAction(playbackState, applicationQueue, dispatch)
                  }
                  loading={playbackState.state === State.Loading}
                  style={{ backgroundColor: "#ff8216", borderRadius: 50 }}
                />
              </View>
              <View className=" h-full w-2/5 flex items-center flex-row justify-around pr-2 ">
                <TouchableOpacity
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  onPress={() => applicationService.timerSkip(progress.position, true)}
                >
                  <Image
                    source={require("../../assets/images/tes/icons8-forward-10-64.png")}
                    style={{
                      tintColor: "white",
                      height: "60%",
                      width: "60%",
                      marginLeft: 6
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nextAndPrevious(true)}>
                  <Icons.KeyboardDown name="skip-next" color={"white"} size={35} />
                </TouchableOpacity>
              </View>
            </View>
            <View className=" h-14 w-full mt-5  flex items-center justify-around flex-row">
              <TouchableOpacity
                onPress={() => applicationService.repeatMode(applicationQueue, dispatch)}
              >
                <Icons.PlayListIcon
                  name={applicationQueue.isRepeat ? "repeat" : "repeat-off"}
                  color={applicationQueue.isRepeat ? "#ff8216" : "#bababa"}
                  size={28}
                />
              </TouchableOpacity>
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
        </View>
      </Modal>
    </GestureRecognizer>
  )
}
export default memo(SongPlayer)
