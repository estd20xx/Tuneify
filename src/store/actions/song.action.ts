import { createAsyncThunk } from "@reduxjs/toolkit"
import { PayloadService, SearchedSongs } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
class PersonalizedSongs extends PayloadService {
  public getSongs = createAsyncThunk("nayawalaGeet", async (): Promise<SearchedSongs> => {
    const response = await Interceptors.get("", {
      params: {
        _format: "json",
        _marker: 0,
        api_version: 4,
        ctx: "web6dot0",
        __call: "search.getResults",
        p: 1,
        q: "Hothon Se Chhu Lo Tum - From 'Prem Geet'", // search songs
        n: 20
      }
    })
    return this.searchedSongPayload(response.data)
  })
}
export const songServiceaction = new PersonalizedSongs()
