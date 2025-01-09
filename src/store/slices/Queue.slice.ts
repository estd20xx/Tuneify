import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { RootState } from "../store"
interface updateSongQueueInterface {
  id: string
  index: number
}
export interface SpecificQueue {
  id: string
  currentSongIndex: number
  currentSongId: string
  isPlaying: boolean
  songs: StoreSongTypes[]
}
export interface InitialCentralQueue {
  data: SpecificQueue | null
  isRepeat: boolean
  isLoading: boolean
  isError: boolean
}
const initialState: InitialCentralQueue = {
  data: null,
  isLoading: false,
  isRepeat: false,
  isError: false
}
const PlayerQueue = createSlice({
  name: "player",
  initialState,
  reducers: {
    updateQueue(state: InitialCentralQueue, actions: PayloadAction<SpecificQueue>) {
      state.data = actions.payload
    },
    updateSongQueue(state: InitialCentralQueue, actions: PayloadAction<updateSongQueueInterface>) {
      if (state.data) {
        state.data.currentSongId = actions.payload.id
        state.data.currentSongIndex = actions.payload.index
      }
    },
    changeTunifyState(state: InitialCentralQueue) {
      if (state.data) {
        state.data.isPlaying = !state.data?.isPlaying
      }
    },
    songRepeat(state: InitialCentralQueue) {
      state.isRepeat = !state.isRepeat
    }
  }
})
export const { updateQueue, updateSongQueue, changeTunifyState, songRepeat } = PlayerQueue.actions
export const centralQueue = (state: RootState) => state.persistedReducer.playerQueue
export default PlayerQueue.reducer
