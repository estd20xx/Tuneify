import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { PlayListRequest } from "../../api/interface/module.interface"
import { PayloadService } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
class PersonalizedAlbumSongs extends PayloadService {
  public getAlbumSongs = createAsyncThunk(
    "album",
    async (id: string, Async) => {
      try {
        const data = await Interceptors.get("", {
          params: {
            ...endPoints.albumDetails,
            albumid: id
          }
        })
        return this.albumPayload(data.data)
      } catch (error: any) {
        return Async.rejectWithValue(error.message)
      }
    }
  )
  public albumPlaylist = createAsyncThunk(
    "albumPlaylist",
    async (id: string, Async) => {
      try {
        const data = await Interceptors.get<PlayListRequest>("", {
          params: {
            ...endPoints.playlistDetails,
            listid: id
          }
        })
        return this.playlistPayload(data.data)
      } catch (e: any) {
        return Async.rejectWithValue(e?.message)
      }
    }
  )
}
export const album = new PersonalizedAlbumSongs()
