import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { PlaybackState } from "react-native-track-player"
import { InitialCentralQueue } from "../store/slices/Queue.slice"
export interface ApplicationInterface {
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
  // setUpPlayer: (data: Array<StoreSongTypes>) => void
  setUpPlayer: () => void
}
