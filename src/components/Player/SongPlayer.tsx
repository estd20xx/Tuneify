import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Animated,
  StatusBar,
} from "react-native"
import TrackImage from "react-native-fast-image"
import React, {useEffect, useState, useCallback, memo} from "react"
import Modal from "react-native-modal"
import LinearGradient from "react-native-linear-gradient"
import TrackPlayer, {
  Track,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  State,
} from "react-native-track-player"
import {FAB as Fab} from "react-native-paper"
import {Icons} from "../../constants/Icon"
import Slider from "@react-native-community/slider"
import TuneifyService from "../../services/Tuneify.service"
import {lyricsApi} from "../../api/api"
const service = new TuneifyService(lyricsApi)
import {addUserFavouritesData} from "../../store/slices/favourite.slice"
import {TypedSelectorHook, useAppDispatch} from "../../hooks/store.hook"
import {
  changeTunifyState,
  tunifyChild,
} from "../../store/slices/childState.slice"
const SongPlayer = ({isVisible, onClose}: {isVisible: any; onClose: any}) => {
  const state = TypedSelectorHook(tunifyChild)
  const dispatch = useAppDispatch()
  const [isFlipped, setIsFlipped] = useState(false)
  const [flip, setFlip] = useState(new Animated.Value(0))
  const [ct, setCt] = useState<Track>()
  const [lyric, setLyric] = useState<string>("We are working on it.! 💻")
  const playbackState = usePlaybackState()
  const progress = useProgress()
  const flipCard = useCallback(() => {
    Animated.timing(flip, {
      toValue: isFlipped ? 0 : 180,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped)
    })
  }, [isFlipped])
  const frontInterpolate = flip.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  })
  const backInterpolate = flip.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  })
  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  }
  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  }
  useEffect(() => {
    service.handleBottomCondition(setCt)
  }, [])
  const format = (seconds: number) => {
    let mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, "0")
    return `${mins}:${secs}`
  }
  console.log(state.isPlaying)
  useTrackPlayerEvents(service.getEvent(), async (event: any) => {
    if (event.state == State.Ended) {
      // service.playPauseAction(playbackState, state, dispatch)
    }
    if (event.state == State.Ready) {
      service.handleBottomCondition(setCt)
      service.getLyrics(setLyric)
    }
  })
  return (
    <Modal isVisible={isVisible} style={{margin: 0}}>
      <ScrollView>
        <StatusBar backgroundColor={service.getGradient()[0]} />
        <LinearGradient colors={service.getGradient()} style={{flex: 1}}>
          <View className="w-full h-screen  px-3 ">
            <View className=" h-10 w-full flex items-center justify-between flex-row">
              <TouchableOpacity
                onPress={() => {
                  onClose()
                }}>
                <Icons.KeyboardDown
                  name="keyboard-arrow-down"
                  size={35}
                  color={"white"}
                />
              </TouchableOpacity>
              <View className="flex flex-row h-full items-center justify-center">
                <TouchableOpacity onPress={() => flipCard()}>
                  <Icons.MoreIcon
                    name="lyrics"
                    size={20}
                    color={"white"}
                    className="mr-4"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icons.MoreIcon name="more-vert" size={25} color={"white"} />
                </TouchableOpacity>
              </View>
            </View>
            <View className=" relative h-1/2 w-full flex items-center justify-center  ">
              <Animated.View
                style={[frontAnimatedStyle, {backfaceVisibility: "hidden"}]}
                className=" w-[85%] h-80  justify-center items-center rounded-xl  overflow-hidden">
                <TrackImage
                  source={{
                    uri: ct?.artwork ? ct.artwork : ct?.cover,
                    headers: {Authorization: "songs"},
                    priority: TrackImage.priority.high,
                    cache: TrackImage.cacheControl.immutable,
                  }}
                  className="h-full w-full "
                />
              </Animated.View>
              <Animated.View
                style={[backAnimatedStyle, {backfaceVisibility: "hidden"}]}
                className="flex absolute   w-[95%] h-full   justify-center items-center rounded-xl ">
                {lyric.length > 15 ? (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text className="text-white text-base min-h-[100px] leading-8 px-5 flex items-center justify-center font-['300']  ">
                      {lyric}
                    </Text>
                  </ScrollView>
                ) : (
                  <Text className="absolute top-52 left-0 ">{lyric}</Text>
                )}
              </Animated.View>
            </View>
            <View className="w-full mt-5 h-auto">
              <View className=" flex items-center justify-between flex-row px-3 ">
                <View className=" py-2">
                  <Text className="text-white text-xl mb-1 font-['400']">
                    {ct?.title}
                  </Text>
                  <Text className="text-white text-sm font-['300']">
                    {ct?.artist}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => dispatch(addUserFavouritesData(ct!))}>
                  <Icons.HomeIcon
                    name="heart-fill"
                    size={20}
                    color={"#16FF00"}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="w-full  mt-5 py-2">
              <Slider
                minimumValue={0}
                maximumValue={progress.duration}
                value={progress.position}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#fff"
                thumbTintColor="white"
                onSlidingComplete={e => TrackPlayer.seekTo(e)}
              />
              <View
                style={{
                  width: "90%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignSelf: "center",
                }}>
                <Text style={{color: "white", fontFamily: "300"}}>
                  {format(progress.position)}
                </Text>
                <Text style={{color: "white", fontFamily: "300"}}>
                  {format(progress.duration)}
                </Text>
              </View>
            </View>
            <View className=" h-18  overflow-hidden w-full flex items-center justify-between flex-row mt-3 px-4">
              <TouchableOpacity>
                <Image
                  source={require("../../assets/images/suffle.png")}
                  style={{width: 30, height: 30, tintColor: "#bababa"}}
                />
              </TouchableOpacity>
              <View className=" w-[45%]   flex items-center justify-evenly flex-row">
                <Icons.KeyboardDown
                  name="skip-previous"
                  color={"white"}
                  size={35}
                  onPress={() => [
                    TrackPlayer.skipToPrevious(),
                    service.handleBottomCondition(setCt),
                    service.getLyrics(setLyric),
                  ]}
                />
                <Fab
                  icon={state.isPlaying ? "pause" : "play"}
                  onPress={() =>
                    service.playPauseAction(playbackState, state, dispatch)
                  }
                  loading={playbackState.state === State.Loading}
                  style={{backgroundColor: "#bababa", borderRadius: 50}}
                />
                <Icons.KeyboardDown
                  name="skip-next"
                  color={"white"}
                  size={35}
                  onPress={() => [
                    TrackPlayer.skipToNext(),
                    service.handleBottomCondition(setCt),
                    service.getLyrics(setLyric),
                  ]}
                />
              </View>
              <TouchableOpacity
                onPress={() => service.repeatMode(state, dispatch)}>
                <Icons.PlayListIcon
                  name={state.repeat ? "repeat" : "repeat-off"}
                  color={state.repeat ? "#16FF00" : "#bababa"}
                  size={28}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </Modal>
  )
}
export default memo(SongPlayer)
