import React, { memo, useCallback, useEffect, useState } from "react"
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
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
import { useDownloadProgress } from "../../hooks/useDownloadProgress"
import { useLyricsView } from "../../hooks/useLyricsView"
import { usePlaylist } from "../../hooks/usePlaylistSlide"
import { useShuffle } from "../../hooks/useShuffle"
import { useTimer } from "../../hooks/useTimer"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { musicService } from "../../services/localMedia.service"
import { getSongsLyrics } from "../../store/actions/lyrics.action"
import {
  addUserFavouritesData,
  tuneifyFavourites
} from "../../store/slices/favourite.slice"
import { storedLyrics } from "../../store/slices/lyrics.slice"
import { centralQueue, updateSongQueue } from "../../store/slices/Queue.slice"
import Show from "../Common/Show"
import Control from "./Control"
import DownloadInfo from "./DownloadInfo"
import PlayerHeader from "./PlayerHeader"
import PlayerInfo from "./PlayerInfo"
import SideModal from "./SideModal"
import SongInfo from "./SongInfo"
import TimerPopUp from "./TimerPopUp"
interface SongPlayerProps {
  isVisible: boolean
  togglePlayer: () => void
}
const SongPlayer: React.FC<SongPlayerProps> = ({ isVisible, togglePlayer }) => {
  const favourite = TypedSelectorHook(tuneifyFavourites)
  const applicationQueue = TypedSelectorHook(centralQueue)
  const lyrics = TypedSelectorHook(storedLyrics)
  const dispatch = useAppDispatch()
  const [isLyricsView, toggleLyricsView] = useLyricsView()
  const [timer, toggleTimer, isTimerModal, toggleModal, value, setTimerValue] =
    useTimer()
  const [isShuffle, toggleShuffle] = useShuffle()
  const [downloadProgress, updateDownloadValue] = useDownloadProgress()
  const [isPlaylist, togglePlayist] = usePlaylist()
  const [flip] = useState(new Animated.Value(0))
  const [currentTrack, setCurrentTrack] = useState<StoreSongTypes>()
  const playbackState = usePlaybackState()
  const progress = useProgress()
  const flipCard = useCallback(() => {
    Animated.timing(flip, {
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

  useEffect(() => {
    if (applicationQueue.data.song) {
      setCurrentTrack(applicationQueue.data.song)
    }
  }, [applicationQueue])

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
        setCurrentTrack(activeTrack as StoreSongTypes)
        dispatch(updateSongQueue(activeTrack as StoreSongTypes))

        if (applicationQueue.data?.screenId != screens.offlineScreenId)
          dispatch(getSongsLyrics(activeTrack?.id))
      }
    }
  )
  return (
    <React.Fragment>
      <Modal
        isVisible={isVisible}
        style={{ margin: 0 }}
        onBackButtonPress={togglePlayer}
      >
        <DownloadInfo progress={downloadProgress} />
        <SideModal
          isVisible={isPlaylist}
          togglePlayist={togglePlayist}
          song={currentTrack!}
        />
        <TimerPopUp
          isModal={isTimerModal}
          value={value}
          setValue={setTimerValue}
          toggleTimer={toggleTimer}
          toggleModal={toggleModal}
          dispatch={dispatch}
        />
        <View className="w-full h-screen px-3 bg-background">
          <PlayerHeader
            togglePlayer={togglePlayer}
            flipCard={flipCard}
            togglePlayist={togglePlayist}
          />
          <View className="relative h-1/2 w-full mt-8 flex items-center justify-center">
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
                style={{
                  borderRadius: 20
                }}
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
                <Text className="absolute top-52 left-0 ">
                  {lyrics.data.lyrics}
                </Text>
              </Show>
            </Animated.View>
          </View>
          <SongInfo currentTrack={currentTrack} />
          <PlayerInfo progress={progress} />
          <Control
            nextAndPrevious={nextAndPrevious}
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
            <TouchableOpacity
              onPress={() =>
                musicService.downloadSong(currentTrack!, updateDownloadValue)
              }
            >
              <Icons.MoreIcon name="download" size={23} color={"#ff8216"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [dispatch(addUserFavouritesData(currentTrack!))]}
            >
              <Icons.HomeIcon
                name="heart-fill"
                size={23}
                color={
                  checkFavAvailable(currentTrack?.id || "") ? "gray" : "#ff8216"
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  )
}
export default memo(SongPlayer)
