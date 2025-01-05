import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { AlbumDetailsResponse } from "../../api/interface/album.interface"
import { PayloadService } from "../../api/service/Payload.service"
import { caller } from "../../lib/axios"
class PersonalizedAlbumSongs extends PayloadService {
  public getAlbumSongs = createAsyncThunk(
    "album",
    async (id: string): Promise<AlbumDetailsResponse> => {
      const data = await caller.Interceptor().get("", {
        params: {
          ...endPoints.albumDetails,
          albumid: id
        }
      })
      return this.albumPayload(data.data)
    }
  )
}
export const album = new PersonalizedAlbumSongs()
