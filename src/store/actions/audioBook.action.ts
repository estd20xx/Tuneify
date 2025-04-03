import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {
  latestAudiobook,
  mostDownloadedOfAllTime,
  mostViewedInThisWeek
} from "../../api/base/constrants"
import { AudioBookScreenInterface } from "../../screens/Home/AudioBook"
export const getAudioBooks = createAsyncThunk(
  "@getAsyncBooks",
  async (_, Async) => {
    try {
      const response = await Promise.all([
        axios.get(latestAudiobook),
        axios.get(mostDownloadedOfAllTime),
        axios.get(mostViewedInThisWeek)
      ])
      const headers = [
        "Recommended for you",
        "Popular All Time",
        "Trending This Week"
      ]
      return response.map((current, index) => {
        return {
          title: headers[index],
          audios: current.data.response.docs
        } as AudioBookScreenInterface
      })
    } catch (error: any) {
      return Async.rejectWithValue(error.message)
    }
  }
)
