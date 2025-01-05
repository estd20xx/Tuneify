import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Song } from "../../../api/service/Payload.service"
import { RootState } from "../../store"
interface updateSongQueueInterface {
  id: string
  index: number
}
interface SpecificQueue {
  id: string
  currentSongIndex: number
  currentSongId: string
  songs: Song[]
}
interface InitialCentralQueue {
  data: SpecificQueue | null
  isLoading: boolean
  isError: boolean
}
const initialState: InitialCentralQueue = {
  data: null,
  isLoading: false,
  isError: false
}
const PlayerQueue = createSlice({
  name: "@player",
  initialState,
  reducers: {
    updateQueue(state: InitialCentralQueue, actions: PayloadAction<any>) {
      // TODO : specify the central format of song before updating the Queue
    },
    updateSongQueue(state: InitialCentralQueue, actions: PayloadAction<updateSongQueueInterface>) {}
  }
})
export const { updateQueue, updateSongQueue } = PlayerQueue.actions
export const centralQueue = (state: RootState) => state.persistedReducer.playerQueue
export default PlayerQueue.reducer
