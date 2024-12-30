import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { PayloadService, SearchedSongs } from "../../api/service/Payload.service"
class PersonalizedSongs extends PayloadService {
  public getSongs = createAsyncThunk("nayawalaGeet", async (): Promise<SearchedSongs> => {
    const response = await axios.get("https://www.jiosaavn.com/api.php", {
      params: {
        _format: "json",
        _marker: 0,
        api_version: 4,
        ctx: "web6dot0",
        __call: "search.getResults",
        p: 1,
        q: "Mera Mann", // search songs
        n: 20
      }
    })
    const finalData = this.searchedSongPayload(response.data)
    return finalData
  })
}
export const songServiceaction = new PersonalizedSongs()
