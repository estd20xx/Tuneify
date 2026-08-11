import React, { useCallback, useEffect, useState } from "react"
import {
  BackHandler,
  Animated as CustomAnimated,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated"
import TextTicker from "react-native-text-ticker"
import TrackPlayer, {
  Event,
  PlaybackState,
  State,
  usePlaybackState,
  useTrackPlayerEvents
} from "react-native-track-player"
import { screens } from "../../api/base/constrants"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { useDownloadProgress } from "../../hooks/useDownloadProgress"
import { useLyricsView } from "../../hooks/useLyricsView"
import { usePlayer } from "../../hooks/usePlayer"
import { usePlaylist } from "../../hooks/usePlaylistSlide"
import { useTimer } from "../../hooks/useTimer"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { musicService } from "../../services/localMedia.service"
import { applicationService } from "../../services/Tuneify.service"
import { getSongsLyrics } from "../../store/actions/lyrics.action"

import { welcomeSong } from "../../constants/welcome"
import { useShuffle } from "../../hooks/useShuffle"
import { useTheme } from "../../hooks/useTheme"
import {
  changeApplicationSetup,
  tunifyChild
} from "../../store/slices/childState.slice"
import {
  addUserFavouritesData,
  tuneifyFavourites
} from "../../store/slices/favourite.slice"
import { storedLyrics } from "../../store/slices/lyrics.slice"
import {
  centralQueue,
  resetScreen,
  updateSongQueue
} from "../../store/slices/Queue.slice"
import Show from "../Common/Show"
import Control from "./Control"
import DownloadButton from "./DownloadButton"
import PlayerHeader from "./PlayerHeader"
import PlayerInfo from "./PlayerInfo"
import SideModal from "./SideModal"
import SongInfo from "./SongInfo"
import TimerPopUp from "./TimerPopUp"
import {
  BOTTOM_NAV_HEIGHT as TAB_BAR_HEIGHT,
  MINI_PLAYER_HEIGHT
} from "../../constants/layout"

const TuneifyPlayer = () => {
  const dispatch = useAppDispatch()
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const { height: SCREEN_HEIGHT } = useWindowDimensions()
  const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + MINI_PLAYER_HEIGHT
  const MIN_TRANSLATE_Y = -(TAB_BAR_HEIGHT + insets.bottom)

  const [
    isPlayer,
    togglePlayer,
    enableGesture,
    toggleGesture,
    showFullPlayer,
    toggleFullScreen,
    showMiniPlayer,
    toggleMiniPlayer
  ] = usePlayer()

  const translateY = useSharedValue(MIN_TRANSLATE_Y)
  const Zindex = useSharedValue(20)
  const [isShuffle, toggleShuffle] = useShuffle()
  const favourite = TypedSelectorHook(tuneifyFavourites)
  const lyrics = TypedSelectorHook(storedLyrics)
  const [isLyricsView, toggleLyricsView] = useLyricsView()
  const [timer, toggleTimer, isTimerModal, toggleModal, value, setTimerValue] =
    useTimer()

  const [downloadProgress, updateDownloadValue] = useDownloadProgress()
  const [isPlaylist, togglePlayist] = usePlaylist()
  const [flip] = useState(new CustomAnimated.Value(0))

  const playbackState: PlaybackState | { state: undefined } = usePlaybackState()
  const applicationQueue = TypedSelectorHook(centralQueue)
  const playerState = TypedSelectorHook(tunifyChild)

  useAnimatedReaction(
    () => translateY.value < MIN_TRANSLATE_Y - 40,
    (expanded, previous) => {
      if (expanded === previous) return
      runOnJS(toggleFullScreen)(expanded)
      runOnJS(toggleMiniPlayer)(!expanded)
    },
    [MIN_TRANSLATE_Y]
  )

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      if (!enableGesture) return
      ctx.startY = translateY.value
    },

    onActive: (event, ctx: any) => {
      if (!enableGesture) return
      translateY.value = ctx.startY + event.translationY
      if (translateY.value < MAX_TRANSLATE_Y) translateY.value = MAX_TRANSLATE_Y
      if (translateY.value > MIN_TRANSLATE_Y) translateY.value = MIN_TRANSLATE_Y
    },

    onEnd: (event) => {
      if (!enableGesture) return
      if (event.translationY < -10) {
        Zindex.value = withTiming(50)

        translateY.value = withSpring(
          MAX_TRANSLATE_Y,
          {
            damping: 15,
            stiffness: 100
          }
        )
      } else if (event.translationY > 10) {
        Zindex.value = withTiming(20)
        translateY.value = withSpring(MIN_TRANSLATE_Y, {
          damping: 15,
          stiffness: 100
        })
      } else {
        translateY.value = withSpring(
          translateY.value < (MAX_TRANSLATE_Y + MIN_TRANSLATE_Y) / 2
            ? MAX_TRANSLATE_Y
            : MIN_TRANSLATE_Y,
          {
            damping: 15,
            stiffness: 100
          }
        )
      }
    }
  })

  const animatedStyles = useAnimatedStyle(() => {
    return {
      zIndex: Zindex.value
    }
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }]
    }
  })

  const flipCard = useCallback(() => {
    CustomAnimated.timing(flip, {
      toValue: isLyricsView ? 0 : 180,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      toggleLyricsView()
    })
  }, [isLyricsView])

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
  const checkFavAvailable = (currentId: string): boolean => {
    if (
      favourite.favouriteData.filter((liked: any) => liked.id == currentId)
        .length > 0
    )
      return false
    return true
  }

  const handleBackButtonPress = () => {
    if (showFullPlayer) {
      ;(translateY.value = withSpring(MIN_TRANSLATE_Y)), (Zindex.value = 20)
      return true
    }
    return false
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress)
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonPress
      )
    }
  }, [showFullPlayer])

  useEffect(() => {
    if (!playerState.isSetupped) {
      applicationService.setUpPlayer(applicationQueue.data.song ?? welcomeSong)
      dispatch(changeApplicationSetup())
      dispatch(resetScreen())
      return
    }
  }, [applicationQueue.data])

  useTrackPlayerEvents(
    [Event.PlaybackActiveTrackChanged, Event.PlaybackError],
    async (event: any) => {
      if (event.type === Event.PlaybackActiveTrackChanged) {
        const activeTrack = event.track ?? (await TrackPlayer.getActiveTrack())
        if (!activeTrack) return
        dispatch(
          updateSongQueue({
            song: activeTrack as StoreSongTypes,
            isPlaying: true
          })
        )
        if (
          activeTrack?.id &&
          applicationQueue.data?.screenId != screens.offlineScreenId
        )
          dispatch(getSongsLyrics(activeTrack.id))
      }
    }
  )
  return (
    <PanGestureHandler enabled={enableGesture} onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -SCREEN_HEIGHT + MINI_PLAYER_HEIGHT,
            height: SCREEN_HEIGHT,
            backgroundColor: theme.background
          },
          animatedStyles,
          animatedStyle
        ]}
      >
        <Show isVisible={showMiniPlayer}>
          {applicationQueue.data.song && (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.surfaceRaised,
                  height: MINI_PLAYER_HEIGHT
                }}
                className=" w-full bottom-0 flex flex-row items-center justify-center px-3"
                activeOpacity={1}
                onPress={() => [
                  (translateY.value = withSpring(
                    MAX_TRANSLATE_Y
                  )),
                  (Zindex.value = withTiming(50))
                ]}
              >
                <View className="flex flex-row items-center h-full w-11/12 overflow-hidden">
                  <Image
                    source={{
                      uri: applicationQueue.data.song.artwork
                    }}
                    style={{ width: 43, height: 43, borderRadius: 5 }}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <TextTicker
                      duration={20000}
                      loop
                      repeatSpacer={50}
                      marqueeDelay={3000}
                      animationType="scroll"
                      className="text-white mb-1 text-xs font-['500']  tracking-wider"
                    >
                      {applicationQueue.data.song.title}
                    </TextTicker>
                    <Text className="text-gray-200 text-[9px] font-['300']">
                      {applicationQueue.data.song.artist.slice(0, 62)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    applicationService.playPauseAction(
                      playbackState,
                      applicationQueue,
                      dispatch
                    )
                  }
                >
                  <Show isVisible={playbackState.state != State.Playing}>
                    <Icons.PlayIcon name="play" color={"white"} size={20} />
                  </Show>
                  <Show isVisible={playbackState.state == State.Playing}>
                    <Icons.PlayIcon name="pause" color={"white"} size={20} />
                  </Show>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          )}
        </Show>
        <Show isVisible={showFullPlayer}>
          <SideModal
            isVisible={isPlaylist}
            togglePlayist={togglePlayist}
            song={applicationQueue.data.song}
          />
          <TimerPopUp
            isModal={isTimerModal}
            value={value}
            setValue={setTimerValue}
            toggleTimer={toggleTimer}
            toggleModal={toggleModal}
            dispatch={dispatch}
          />
          <View
            style={{
              flex: 1,
              paddingTop: insets.top,
              paddingBottom: insets.bottom + TAB_BAR_HEIGHT
            }}
            className="w-full px-3"
          >
            <PlayerHeader
              minValue={MIN_TRANSLATE_Y}
              Zindex={Zindex}
              translateY={translateY}
              flipCard={flipCard}
              togglePlayist={togglePlayist}
            />
            <View className="relative flex-1 w-full my-4 flex items-center justify-center">
              <CustomAnimated.View
                style={[
                  frontAnimatedStyle,
                  { backfaceVisibility: "hidden", position: "absolute" }
                ]}
                className="w-[90%] h-full overflow-hidden"
                pointerEvents={isLyricsView ? "none" : "auto"}
              >
                <Image
                  className="h-full w-full rounded-xl"
                  source={{
                    uri: applicationQueue.data.song?.artwork
                  }}
                  resizeMode="contain"
                  style={{
                    borderRadius: 20
                  }}
                />
              </CustomAnimated.View>
              <CustomAnimated.View
                style={[backAnimatedStyle, { backfaceVisibility: "hidden" }]}
                className="flex absolute  w-[95%] h-full  justify-center items-center rounded-xl"
                pointerEvents={isLyricsView ? "auto" : "none"}
              >
                <Show isVisible={lyrics.data.lyrics?.length > 15}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Pressable
                      onTouchStart={(e) => toggleGesture(false)}
                      onTouchMove={() => toggleGesture(true)}
                      onTouchEnd={() => toggleGesture(true)}
                    >
                      <Text className="text-white  text-base  leading-8 flex items-center justify-center font-['300']">
                        {lyrics.data.lyrics?.replaceAll("<br>", "\n")}
                      </Text>
                    </Pressable>
                  </ScrollView>
                </Show>
                <Show isVisible={lyrics.data.lyrics?.length < 15}>
                  <Text className="absolute top-52 left-0">
                    {lyrics.data.lyrics}
                  </Text>
                </Show>
              </CustomAnimated.View>
            </View>
            <SongInfo currentTrack={applicationQueue.data.song} />
            <PlayerInfo />
            <Control
              isRepeat={applicationQueue.isRepeat}
              playbackState={playbackState}
              applicationQueue={applicationQueue}
              dispatch={dispatch}
              isShuffle={isShuffle}
              toggleShuffle={toggleShuffle}
            />
            <View className=" h-14 w-full mt-5  flex items-center justify-around flex-row">
              <TouchableOpacity>
                <Image
                  source={require("../../assets/images/tes/Timer-repeat.png")}
                  style={{ width: 28, height: 28, tintColor: "white" }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <Image
                  source={require("../../assets/images/tes/Timer.png")}
                  style={{
                    width: 32,
                    height: 32,
                    tintColor: timer ? "#ff8216" : "white"
                  }}
                />
              </TouchableOpacity>
              <DownloadButton
                downloadProgress={downloadProgress}
                onPress={() =>
                  musicService.downloadSong(
                    applicationQueue.data.song,
                    updateDownloadValue,
                    dispatch
                  )
                }
              />
              <TouchableOpacity
                onPress={() => [
                  dispatch(addUserFavouritesData(applicationQueue.data.song!))
                ]}
              >
                <Icons.HomeIcon
                  name="heart-fill"
                  size={23}
                  color={
                    checkFavAvailable(applicationQueue.data.song?.id || "")
                      ? "gray"
                      : "#ff8216"
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </Show>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default TuneifyPlayer
