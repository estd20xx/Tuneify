import axios from "axios"
import {ITuneify} from "../Interfaces/tuneifySetUp.interface"
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  PlaybackState,
  RepeatMode,
  State,
  Track,
} from "react-native-track-player"
import SuggestedServices from "./suggested.service"
import {
  changeTunifyRepeatMode,
  changeTunifyState,
} from "../store/slices/childState.slice"
import {Dispatch, UnknownAction} from "@reduxjs/toolkit"
import {
  InitialChildStateTypes,
  InitialSongStateTypes,
} from "../Interfaces/tuneifySlice.interface"
export default class TuneifyService
  extends SuggestedServices
  implements ITuneify
{
  constructor(private lyricApi: string) {
    super()
  }
  public getGradient = (): string[] => {
    const colors = [
      "#b8b7b8",
      "#a4a3a4",
      "#8f8e8f",
      "#7b7a7b",
      "#666666",
      "#525152",
      "#3d3d3d",
      "#292829",
      "#141414",
    ]
    return colors
  }
  public getEvent = (): Event[] => {
    const events: Event[] = [
      Event.PlaybackState,
      Event.PlaybackError,
      Event.PlaybackState,
      Event.PlaybackError,
    ]
    return events
  }
  public getLyrics = async (
    setLyric: (lyric: string) => void
  ): Promise<void> => {
    try {
      let currentTrack = await TrackPlayer.getActiveTrack()
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
    state: InitialChildStateTypes,
    dispatch: Dispatch<UnknownAction>
  ): Promise<void> => {
    try {
      state.repeat
        ? TrackPlayer.setRepeatMode(RepeatMode.Queue)
        : TrackPlayer.setRepeatMode(RepeatMode.Off)
      dispatch(changeTunifyRepeatMode())
    } catch (error) {
      console.log(error)
    }
  }
  public timerSkip = async (position: number, forw: boolean): Promise<void> => {
    try {
      forw
        ? await TrackPlayer.seekTo(position + 10)
        : await TrackPlayer.seekTo(position - 10)
    } catch (error) {
      console.log("Error happens during forward and backward")
    }
  }
  public playPauseAction = async (
    playbackState: PlaybackState | {state: undefined},
    state: InitialChildStateTypes,
    dispatch: Dispatch<UnknownAction>
  ): Promise<void> => {
    playbackState.state == State.Playing
      ? await TrackPlayer.pause()
      : await TrackPlayer.play()
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

  public setUpPlayer = async (data: InitialSongStateTypes) => {
    try {
      await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
        autoHandleInterruptions: true,
      })
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToPrevious,
          Capability.Stop,
          Capability.SeekTo,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Stop,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Stop,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
      })
      await TrackPlayer.add(data.songs)
    } catch (error) {
      console.log(error)
    }
  }
}
