import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { PlayListRequest } from "../../api/interface/module.interface"
import { PayloadService } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
class SeperateAlbmPlaylistType extends PayloadService {
  public getPlaylistsSongs = createAsyncThunk(
    "seperateAlbumNPlay",
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
export const albumNPlaylist = new SeperateAlbmPlaylistType()
