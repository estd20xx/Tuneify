import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { RootState } from "../store"
export interface SpecificQueue {
  screenId: string
  song: StoreSongTypes
  isPlaying: boolean
}
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
      actions: PayloadAction<StoreSongTypes>
    ) {
      state.data.song = actions.payload
    },
    songRepeat(state: InitialCentralQueue) {
      state.isRepeat = !state.isRepeat
    }
  }
})
export const { updateQueue, updateSongQueue, songRepeat } = PlayerQueue.actions
export const centralQueue = (state: RootState) =>
  state.persistedReducer.playerQueue
export default PlayerQueue.reducer
