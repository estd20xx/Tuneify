import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseURL, endPoints } from "../../api/base/endpoint"
import { PayloadService, SearchedSongs } from "../../api/service/Payload.service"
import { SearchedSongQueryParams } from "../../screens/Search"
class PersonalizedSearchSongDetails extends PayloadService {
  public getSearchedSongDetails = createAsyncThunk(
    "searchedSong",
    async (props: SearchedSongQueryParams): Promise<SearchedSongs> => {
      const data = await axios.get(baseURL, {
        params: {
          ...endPoints.searchedSongsDetails,
          ...props
        }
      })
      const finalData = this.searchedSongPayload(data.data)
      return finalData
    }
  )
}
export const personalizedSearchedSong = new PersonalizedSearchSongDetails()
