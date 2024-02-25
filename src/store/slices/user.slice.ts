import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {RootState} from "../store"
import {InitialUserState} from "../../Interfaces/tuneifySlice.interface"

const initialState: InitialUserState = {
  userName: "namelessnerd",
}
const userSlices = createSlice({
  name: "userDev",
  initialState,
  reducers: {
    addUser(state: InitialUserState, actions: PayloadAction<string>) {
      state.userName = actions.payload
    },
  },
})
export const {addUser} = userSlices.actions
export const tuneifyUser = (state: RootState) => state.persistedReducer.user
export default userSlices.reducer
