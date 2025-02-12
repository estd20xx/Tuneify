import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  AlbumDetailsResponse,
  TrendingAlbumSons
} from "../../api/interface/album.interface"
import { PlaylistResponseOnce } from "../../api/interface/module.interface"
import { album } from "../actions/album.action"
import { RootState } from "../store"
interface InitialAlbumSongsInterface {
  data: AlbumDetailsResponse | null
  isLoading: boolean
  isError: boolean
}
const initialState: InitialAlbumSongsInterface = {
  data: null,
  isLoading: false,
  isError: false
}
const albumSlice = createSlice({
  name: "@album",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        album.getAlbumSongs.pending,
        (state: InitialAlbumSongsInterface) => {
          state.isLoading = true
          state.isError = false
        }
      )
      .addCase(
        album.getAlbumSongs.fulfilled,
        (
          state: InitialAlbumSongsInterface,
          action: PayloadAction<AlbumDetailsResponse>
        ) => {
          state.data = action.payload
          state.isLoading = false
        }
      )
      .addCase(
        album.getAlbumSongs.rejected,
        (state: InitialAlbumSongsInterface, actions: PayloadAction<any>) => {
          state.isError = true
          state.isLoading = false
          state.data = null
        }
      )
      .addCase(
        album.albumPlaylist.pending,
        (state: InitialAlbumSongsInterface) => {
          state.isLoading = true
          state.isError = false
        }
      )
      .addCase(
        album.albumPlaylist.fulfilled,
        (
          state: InitialAlbumSongsInterface,
          actions: PayloadAction<PlaylistResponseOnce>
        ) => {
          if (state.data?.songs) {
            state.data.songs = actions.payload.list.map((current) => {
              return {
                id: current.id,
                title: current.title,
                subtitle: current.subtitle,
                image: current.image,
                year: current.year,
                play_count: current.play_count,
                songLink: current.more_info.songLink,
                duration: current.more_info.duration,
                artists: "unknown",
                has_lyrics: ""
              } as TrendingAlbumSons
            })
            state.isLoading = false
          }
        }
      )
      .addCase(
        album.albumPlaylist.rejected,
        (state: InitialAlbumSongsInterface) => {
          state.isError = true
          state.isLoading = false
          state.data = null
        }
      )
  }
})
export const albumData = (state: RootState) => state.persistedReducer.album
export default albumSlice.reducer
