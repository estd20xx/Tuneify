import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { RootState } from "../store"
export interface SpecificQueue {
  screenId: string
  song: StoreSongTypes
  isPlaying: boolean
}
export interface SongChangeInterface
  extends Pick<SpecificQueue, "song" | "isPlaying"> {}
export interface InitialCentralQueue {
  data: SpecificQueue
  isRepeat: boolean
  isSuffle: boolean
  isLoading: boolean
  isError: boolean
}
const initialState: InitialCentralQueue = {
  data: {} as SpecificQueue,
  isLoading: false,
  isRepeat: false,
  isSuffle: false,
  isError: false
}
const PlayerQueue = createSlice({
  name: "player",
  initialState,
  reducers: {
    updateQueue(
      state: InitialCentralQueue,
      actions: PayloadAction<SpecificQueue>
    ) {
      state.data = actions.payload
    },
    updateSongQueue(
      state: InitialCentralQueue,
      actions: PayloadAction<SongChangeInterface>
    ) {
      state.data.song = actions.payload.song
      state.data.isPlaying = actions.payload.isPlaying
    },
    songRepeat(state: InitialCentralQueue) {
      state.isRepeat = !state.isRepeat
    },
    resetScreen(state: InitialCentralQueue) {
      state.data.screenId = ""
    }
  }
})
export const { updateQueue, updateSongQueue, songRepeat, resetScreen } =
  PlayerQueue.actions
export const centralQueue = (state: RootState) =>
  state.persistedReducer.playerQueue
export default PlayerQueue.reducer
