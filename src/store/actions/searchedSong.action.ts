import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { PayloadService } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
import { SearchedSongQueryParams } from "../../screens/Search"
class PersonalizedSearchSongDetails extends PayloadService {
  public getSearchedSongDetails = createAsyncThunk(
    "searchedSong",
    async (props: SearchedSongQueryParams, Async) => {
      try {
        const data = await Interceptors.get("", {
          params: {
            ...endPoints.searchedSongsDetails,
            ...props
          }
        })
        return this.searchedSongPayload(data.data)
      } catch (error: any) {
        return Async.rejectWithValue(error.message)
      }
    }
  )
}
export const personalizedSearchedSong = new PersonalizedSearchSongDetails()
