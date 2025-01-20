import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { PayloadService } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
import { SearchedSongQueryParams } from "../../screens/Search"
interface Props {
  query: SearchedSongQueryParams
}
class PersonalizedSearchSongPagination extends PayloadService {
  public getSearchedSongDetails = createAsyncThunk(
    "searchPagination",
    async (props: Props, Async) => {
      try {
        const data = await Interceptors.get("", {
          params: {
            ...endPoints.searchedSongsDetails,
            ...props.query
          }
        })
        return this.searchedSongPayload(data.data)
      } catch (error: any) {
        return Async.rejectWithValue(error.message)
      }
    }
  )
}
export const searchSongPagination = new PersonalizedSearchSongPagination()
