import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { PlayListRequest, PlaylistResponseOnce } from "../../api/interface/module.interface"
import { PayloadService } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
class PersonalizedPlaylistsSongs extends PayloadService {
  public getPlaylistsSongs = createAsyncThunk(
    "paylist",
    async (id: string): Promise<PlaylistResponseOnce> => {
      const data = await Interceptors.get<PlayListRequest>("", {
        params: {
          ...endPoints.playlistDetails,
          listid: id
        }
      })
      return this.playlistPayload(data.data)
    }
  )
}
export const playlistDetails = new PersonalizedPlaylistsSongs()
