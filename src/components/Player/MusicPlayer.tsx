import React, { useCallback, useEffect, useState } from "react"
import {
  Dimensions,
  Animated as FullPlayerAnimated,
  Image,
  NativeModules,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from "react-native-reanimated"
import TextTicker from "react-native-text-ticker"
import TrackPlayer, {
  Event,
  PlaybackState,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents
} from "react-native-track-player"
import { screens } from "../../api/base/constrants"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { useDownloadProgress } from "../../hooks/useDownloadProgress"
import { useLyricsView } from "../../hooks/useLyricsView"
import { usePlayer } from "../../hooks/usePlayer"
import { usePlaylist } from "../../hooks/usePlaylistSlide"
import { useShuffle } from "../../hooks/useShuffle"
import { useTimer } from "../../hooks/useTimer"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { applicationService } from "../../services/Tuneify.service"
import { getSongsLyrics } from "../../store/actions/lyrics.action"
import {
  changeApplicationSetup,
  tunifyChild
} from "../../store/slices/childState.slice"
import { tuneifyFavourites } from "../../store/slices/favourite.slice"
import { storedLyrics } from "../../store/slices/lyrics.slice"
import {
  centralQueue,
  resetScreen,
  updateSongQueue
} from "../../store/slices/Queue.slice"
import Show from "../Common/Show"
import SongPlayer from "./SongPlayer"
const { StatusBarManager } = NativeModules
const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const BOTTOM_TAB_BAR_HEIGHT = 0

const offSet = 54
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + offSet
const MIN_TRANSLATE_Y = -BOTTOM_TAB_BAR_HEIGHT - 10

const TuneifyPlayer = () => {
  const [isPlayer, togglePlayer] = usePlayer()
  const translateY = useSharedValue(MIN_TRANSLATE_Y)
  const Zindex = useSharedValue(20)
  const [showFullPlayer, setShowFullPlayer] = useState(false)
  const [showMiniPlayer, setShowMiniPlayer] = useState(true)

  const dispatch = useAppDispatch()
  const playbackState: PlaybackState | { state: undefined } = usePlaybackState()
  const applicationQueue = TypedSelectorHook(centralQueue)
  const playerState = TypedSelectorHook(tunifyChild)

  useDerivedValue(() => {
    runOnJS(setShowMiniPlayer)(translateY.value > MIN_TRANSLATE_Y - 40)
    runOnJS(setShowFullPlayer)(translateY.value < MIN_TRANSLATE_Y - 40)
  }, [translateY])

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value
    },
    onActive: (event, ctx: any) => {
      translateY.value = ctx.startY + event.translationY
      if (translateY.value < MAX_TRANSLATE_Y) translateY.value = MAX_TRANSLATE_Y
      if (translateY.value > MIN_TRANSLATE_Y) translateY.value = MIN_TRANSLATE_Y
    },
    onEnd: (event) => {
      if (event.translationY < -10) {
        Zindex.value = 50
        translateY.value = withSpring(
          MAX_TRANSLATE_Y + StatusBarManager.HEIGHT,
          {
            damping: 15,
            stiffness: 100
          }
        )
      } else if (event.translationY > 10) {
        Zindex.value = 20
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

  //-- full player - start

  const favourite = TypedSelectorHook(tuneifyFavourites)
  const lyrics = TypedSelectorHook(storedLyrics)
  const [isLyricsView, toggleLyricsView] = useLyricsView()
  const [timer, toggleTimer, isTimerModal, toggleModal, value, setTimerValue] =
    useTimer()
  const [isShuffle, toggleShuffle] = useShuffle()
  const [downloadProgress, updateDownloadValue] = useDownloadProgress()
  const [isPlaylist, togglePlayist] = usePlaylist()
  const progress = useProgress()
  const [flip] = useState(new FullPlayerAnimated.Value(0))
  const flipCard = useCallback(() => {
    FullPlayerAnimated.timing(flip, {
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
  const nextAndPrevious = async (isNext: boolean) => {
    if (isShuffle) {
      const index = (await TrackPlayer.getQueue()).length
      const random = Math.floor(Math.random() * index)
      await TrackPlayer.skip(random)
      return
    }

    isNext ? await TrackPlayer.skipToNext() : await TrackPlayer.skipToPrevious()
  }

  const checkFavAvailable = (currentId: string): boolean => {
    if (
      favourite.favouriteData.filter((liked: any) => liked.id == currentId)
        .length > 0
    )
      return false
    return true
  }
  useTrackPlayerEvents(
    [
      Event.PlaybackState,
      Event.PlaybackError,
      Event.PlaybackState,
      Event.PlaybackError
    ],
    async (event: any) => {
      if (event.state == State.Loading) {
        const activeTrack = await TrackPlayer.getActiveTrack()
        dispatch(
          updateSongQueue({
            song: activeTrack as StoreSongTypes,
            isPlaying: true
          })
        )
        if (applicationQueue.data?.screenId != screens.offlineScreenId)
          dispatch(getSongsLyrics(activeTrack?.id))
      }
    }
  )
  // full player -end

  useEffect(() => {
    if (!playerState.isSetupped) {
      applicationService.setUpPlayer(applicationQueue.data.song ?? null)
      dispatch(changeApplicationSetup())
      dispatch(resetScreen())
    }
  }, [applicationQueue.data])

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -SCREEN_HEIGHT + StatusBarManager.HEIGHT + offSet,
            height: SCREEN_HEIGHT,
            backgroundColor: "#1b1002"
          },
          animatedStyles,
          animatedStyle
        ]}
      >
        <Show isVisible={showMiniPlayer}>
          {applicationQueue.data.song && (
            <View>
              <TouchableOpacity
                className=" h-14 w-full bottom-0 flex flex-row items-center justify-center px-3 bg-bottomPlayer"
                activeOpacity={1}
                onPress={() => [
                  (translateY.value =
                    MAX_TRANSLATE_Y + StatusBarManager.HEIGHT),
                  (Zindex.value = 50)
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
        <SongPlayer isVisible={isPlayer} togglePlayer={togglePlayer} />
      </Animated.View>
    </PanGestureHandler>
  )
}

export default TuneifyPlayer
