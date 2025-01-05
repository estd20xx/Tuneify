import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { PayloadService, SearchedSongs } from "../../api/service/Payload.service"
import { caller } from "../../lib/axios"
import { SearchedSongQueryParams } from "../../screens/Search"
class PersonalizedSearchSongDetails extends PayloadService {
  public getSearchedSongDetails = createAsyncThunk(
    "searchedSong",
    async (props: SearchedSongQueryParams): Promise<SearchedSongs> => {
      const data = await caller.Interceptor().get("", {
        params: {
          ...endPoints.searchedSongsDetails,
          ...props
        }
      })
      return this.searchedSongPayload(data.data)
    }
  )
}
export const personalizedSearchedSong = new PersonalizedSearchSongDetails()
