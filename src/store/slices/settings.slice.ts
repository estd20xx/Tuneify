import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface SettingsState {
  notifications: boolean
  language: string
  accent: string
  highQuality: boolean
}

export const LANGUAGES = [
  "english",
  "hindi",
  "punjabi",
  "tamil",
  "telugu",
  "marathi",
  "bengali"
]

export const ACCENTS = ["#ff8216", "#16FF00", "#00b4ff", "#ff2e88", "#b26bff"]

const initialState: SettingsState = {
  notifications: true,
  language: "english",
  accent: "#ff8216",
  highQuality: true
}

const settingsSlice = createSlice({
  name: "@settings",
  initialState,
  reducers: {
    toggleNotifications(state: SettingsState) {
      state.notifications = !state.notifications
    },
    toggleHighQuality(state: SettingsState) {
      state.highQuality = !state.highQuality
    },
    changeLanguage(state: SettingsState, actions: PayloadAction<string>) {
      state.language = actions.payload
    },
    changeAccent(state: SettingsState, actions: PayloadAction<string>) {
      state.accent = actions.payload
    }
  }
})

export const {
  toggleNotifications,
  toggleHighQuality,
  changeLanguage,
  changeAccent
} = settingsSlice.actions
export const appSettings = (state: RootState) =>
  state.persistedReducer.settings
export default settingsSlice.reducer
