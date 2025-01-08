import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { Event, PlaybackState, Track } from "react-native-track-player"
import { InitialCentralQueue } from "../store/slices/new/Queue.slice"
import { InitialSongStateTypes } from "./tuneifySlice.interface"
export interface ITuneify {
  getLyrics: (setlyrics: (lyric: string) => void) => Promise<void>
  repeatMode: (state: InitialCentralQueue, dispatch: Dispatch<UnknownAction>) => Promise<void>
  timerMusicOff: (
    period: number,
    dispatch: Dispatch<UnknownAction>,
    setIsTimer: (isTimer: boolean) => void
  ) => void
  timerSkip: (position: number, forw: boolean) => Promise<void>
  playPauseAction: (
    playbackState: PlaybackState | { state: undefined },
    state: InitialCentralQueue,
    dispatch: Dispatch<UnknownAction>
  ) => Promise<void>
  getEvent: () => Event[]
  setUpPlayer: (data: InitialSongStateTypes) => void
  handleBottomCondition: (setCurrentTrack: (track: Track) => void) => Promise<void>
}
