import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { Interceptors } from "../../lib/axios"
export const getSongsLyrics = createAsyncThunk(
  "lyrics",
  async (id: string, Async) => {
    try {
      const response = await Interceptors.get("", {
        params: {
          ...endPoints.lyrics,
          lyrics_id: id
        }
      })
      if (response.data.error) throw new Error()
      return response.data
    } catch (error: any) {
      return Async.rejectWithValue(error.message)
    }
  }
)
