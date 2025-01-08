import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import axios from "axios"
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  PlaybackState,
  RepeatMode,
  Track
} from "react-native-track-player"
import { ITuneify } from "../Interfaces/tuneifySetUp.interface"
import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import { changeTunifyState, InitialCentralQueue, songRepeat } from "../store/slices/new/Queue.slice"
import SuggestedServices from "./suggested.service"
export default class TuneifyService extends SuggestedServices implements ITuneify {
  constructor(private lyricApi: string) {
    super()
  }
  public getEvent = (): Event[] => {
    const events: Event[] = [
      Event.PlaybackState,
      Event.PlaybackError,
      Event.PlaybackState,
      Event.PlaybackError
    ]
    return events
  }
  public getLyrics = async (setLyric: (lyric: string) => void): Promise<void> => {
    try {
      let currentTrack = await TrackPlayer.getActiveTrack()
      // TODO : need to handle lyrics api
      const data = await axios.get(`${this.lyricApi}${currentTrack?.id}`)
      if (data.data.data) {
        setLyric(data.data.data.lyrics)
      } else {
        setLyric("We are working on it.! 💻")
      }
    } catch (error) {
      setLyric("We are working on it.! 💻")
    }
  }
  public repeatMode = async (
    state: InitialCentralQueue,
    dispatch: Dispatch<UnknownAction>
  ): Promise<void> => {
    try {
      state.isRepeat
        ? TrackPlayer.setRepeatMode(RepeatMode.Queue)
        : TrackPlayer.setRepeatMode(RepeatMode.Off)
      dispatch(songRepeat())
    } catch (error) {
      console.log(error)
    }
  }
  public timerSkip = async (position: number, forw: boolean): Promise<void> => {
    try {
      forw ? await TrackPlayer.seekTo(position + 10) : await TrackPlayer.seekTo(position - 10)
    } catch (error) {
      console.log("Error happens during forward and backward")
    }
  }
  public timerMusicOff = (
    period: number,
    dispatch: Dispatch<UnknownAction>,
    setIsTimer: (isTimer: boolean) => void
  ): void => {
    const trackOff = async () => {
      try {
        await TrackPlayer.pause()
        dispatch(changeTunifyState())
        setIsTimer(false)
      } catch (error) {
        console.log("Error In turning of Music")
      }
    }
    setTimeout(() => {
      trackOff()
    }, period * 1000 * 60)
  }
  public playPauseAction = async (
    playbackState: PlaybackState | { state: undefined },
    state: InitialCentralQueue,
    dispatch: Dispatch<UnknownAction>
  ): Promise<void> => {
    state.data?.isPlaying ? await TrackPlayer.pause() : await TrackPlayer.play()
    dispatch(changeTunifyState())
  }
  public handleBottomCondition = async (
    setCurrentTrrack: (track: Track) => void
  ): Promise<void> => {
    try {
      const currentTrack = await TrackPlayer.getActiveTrack()
      currentTrack && setCurrentTrrack(currentTrack)
    } catch (error) {
      console.log(error)
    }
  }

  public setUpPlayer = async (songs: Array<StoreSongTypes>) => {
    try {
      await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
        autoHandleInterruptions: true
      })
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToPrevious,
          Capability.Stop,
          Capability.SeekTo
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Stop,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Stop,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo
        ],
        playIcon: require("../assets/images/playing.png"),
        pauseIcon: require("../assets/images/privacy.png"),
        stopIcon: require("../assets/images/forward.png"),
        previousIcon: require("../assets/images/mode.png"),
        nextIcon: require("../assets/images/suffle.png"),
        icon: require("../assets/images/setting.png")
      })
      await TrackPlayer.add(songs)
    } catch (error) {
      console.log(error)
    }
  }
}
