import axios from "axios"
import { baseURL, endPoints } from "../../api/base/endpoint"
import { AlbumDetailsResponse } from "../../api/interface/album.interface"
import { PayloadService } from "../../api/service/Payload.service"
import { createAsyncThunk } from "@reduxjs/toolkit"
class PersonalizedAlbumSongs extends PayloadService {
  public getAlbumSongs = createAsyncThunk(
    "album",
    async (id: string): Promise<AlbumDetailsResponse> => {
      const data = await axios.get(baseURL, {
        params: {
          ...endPoints.albumDetails,
          albumid: id,
        },
      })
      const finalData = this.albumPayload(data.data)
      return finalData
    }
  )
}
export const album = new PersonalizedAlbumSongs()
