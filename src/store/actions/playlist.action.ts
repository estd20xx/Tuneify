import { createAsyncThunk } from "@reduxjs/toolkit"
import { PayloadService } from "../../api/service/Payload.service"
import axios from "axios"
import { baseURL, endPoints } from "../../api/base/endpoint"

class PersonalizedPlaylistsSongs extends PayloadService {
  public getPlaylistsSongs = createAsyncThunk("paylist", async (id: string) => {
    const data = await axios.get(baseURL, {
      params: {
        ...endPoints.playlistDetails,
        listid: id
      }
    })
    // const finalData = this.albumPayload(data.data)
    // return
    console.log(data.data)
  })
}
export const playlist = new PersonalizedPlaylistsSongs()
