import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  PlaybackState,
  RepeatMode,
  State
} from "react-native-track-player"
import { ApplicationInterface } from "../Interfaces/application.interface"
import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import { InitialCentralQueue, songRepeat } from "../store/slices/Queue.slice"
class ApplicationService implements ApplicationInterface {
  public repeatMode = async (
    state: InitialCentralQueue,
    dispatch: Dispatch<UnknownAction>
  ): Promise<void> => {
    try {
      state.isRepeat
        ? TrackPlayer.setRepeatMode(RepeatMode.Track)
        : TrackPlayer.setRepeatMode(RepeatMode.Queue)
      dispatch(songRepeat())
    } catch (error) {
      console.log(error)
    }
  }
  public timerSkip = async (
    position: number,
    forward: boolean
  ): Promise<void> => {
    try {
      forward
        ? await TrackPlayer.seekTo(position + 10)
        : await TrackPlayer.seekTo(position - 10)
    } catch (error) {
      console.log("Error happens during forward and backward")
    }
  }
  public timerMusicOff = (
    period: number,
    dispatch: Dispatch<UnknownAction>,
    toggleTimer: () => void
  ): void => {
    const trackOff = async () => {
      try {
        await TrackPlayer.pause()
        toggleTimer()
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
    playbackState.state == State.Playing
      ? await TrackPlayer.pause()
      : await TrackPlayer.play()
  }
  public setUpPlayer = async (data: StoreSongTypes | null) => {
    try {
      await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
        autoHandleInterruptions: true
      })
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
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
        stopIcon: require("../assets/images/stop.png")
      })
      if (!data) return
      await TrackPlayer.add(data)
    } catch (error) {
      console.log(error)
    }
  }
}
export const applicationService = new ApplicationService()
