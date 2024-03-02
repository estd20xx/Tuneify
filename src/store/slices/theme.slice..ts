import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {Themes, themes} from "../../constants/colors"
import {RootState} from "../store"
const initialState: Themes = {
  text: " rgb(253, 231, 245)",
  background: " rgb(29, 2, 21)",
  primary: " rgb(244, 118, 208)",
  secondary: " rgb(160, 82, 13)",
  accent: " rgb(239, 233, 57)",
}
const themeSlice = createSlice({
  name: "themesDEv",
  initialState,
  reducers: {
    assignTheme(state: Themes, actions: PayloadAction<number>) {
      console.log("comming ", actions.payload)
      Object.assign(state, themes[actions.payload])
    },
  },
})
export const {assignTheme} = themeSlice.actions
export const tunifyThemeData = (state: RootState) =>
  state.persistedReducer.theme
export default themeSlice.reducer
