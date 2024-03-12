import {Event, PlaybackState, Track} from "react-native-track-player"
import {InitialSongStateTypes} from "../store/slices/song.slice"
import {InitialChildStateTypes} from "../store/slices/childState.slice"
import {Dispatch, UnknownAction} from "@reduxjs/toolkit"
export interface ITuneify {
  getLyrics: (setlyrics: (lyric: string) => void) => Promise<void>
  repeatMode: (
    state: InitialChildStateTypes,
    dispatch: Dispatch<UnknownAction>
  ) => Promise<void>
  playPauseAction: (
    playbackState: PlaybackState | {state: undefined},
    state: InitialChildStateTypes,
    dispatch: Dispatch<UnknownAction>
  ) => void
  getEvent: () => Event[]
  setUpPlayer: (data: InitialSongStateTypes) => void
  handleBottomCondition: (
    setCurrentTrack: (track: Track) => void
  ) => Promise<void>
}
