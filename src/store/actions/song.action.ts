import { createAsyncThunk } from "@reduxjs/toolkit"
import { params } from "../../api/base/endpoint"
import { PayloadService } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
class PersonalizedSongs extends PayloadService {
  public getSongs = createAsyncThunk("nayawalaGeet", async (_, Async) => {
    try {
      const response = await Interceptors.get("", {
        params: {
          ...params
        }
      })
      return this.searchedSongPayload(response.data)
    } catch (error: any) {
      return Async.rejectWithValue(error.message)
    }
  })
}
export const songServiceaction = new PersonalizedSongs()
