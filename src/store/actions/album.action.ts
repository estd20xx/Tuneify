import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { PayloadService } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
class PersonalizedAlbumSongs extends PayloadService {
  public getAlbumSongs = createAsyncThunk("album", async (id: string, Async) => {
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
  })
}
export const album = new PersonalizedAlbumSongs()
