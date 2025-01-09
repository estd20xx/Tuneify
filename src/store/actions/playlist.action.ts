import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { PlayListRequest } from "../../api/interface/module.interface"
import { PayloadService } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
class PersonalizedPlaylistsSongs extends PayloadService {
  public getPlaylistsSongs = createAsyncThunk("paylist", async (id: string, Async) => {
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
  })
}
export const playlistDetails = new PersonalizedPlaylistsSongs()
