import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseURL, endPoints } from "../../api/base/endpoint"
import { PlayListRequest, PlaylistResponseOnce } from "../../api/interface/module.interface"
import { PayloadService } from "../../api/service/Payload.service"
class PersonalizedPlaylistsSongs extends PayloadService {
  public getPlaylistsSongs = createAsyncThunk(
    "paylist",
    async (id: string): Promise<PlaylistResponseOnce> => {
      const data = await axios.get<PlayListRequest>(baseURL, {
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
