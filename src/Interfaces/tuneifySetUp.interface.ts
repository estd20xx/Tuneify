import {Event, PlaybackState, Track} from "react-native-track-player"
import {
  InitialSongStateTypes,
  InitialChildStateTypes,
} from "./tuneifySlice.interface"
import {Dispatch, UnknownAction} from "@reduxjs/toolkit"
export interface ITuneify {
  getLyrics: (setlyrics: (lyric: string) => void) => Promise<void>
  repeatMode: (
    state: InitialChildStateTypes,
    dispatch: Dispatch<UnknownAction>
  ) => Promise<void>
  getGradient: () => string[]
  timerMusicOff: (
    period: number,
    dispatch: Dispatch<UnknownAction>,
    setIsTimer: (isTimer: boolean) => void
  ) => void
  timerSkip: (position: number, forw: boolean) => Promise<void>
  playPauseAction: (
    playbackState: PlaybackState | {state: undefined},
    state: InitialChildStateTypes,
    dispatch: Dispatch<UnknownAction>
  ) => Promise<void>
  getEvent: () => Event[]
  setUpPlayer: (data: InitialSongStateTypes) => void
  handleBottomCondition: (
    setCurrentTrack: (track: Track) => void
  ) => Promise<void>
}
