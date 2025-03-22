import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { Interceptors } from "../../lib/axios"
type Props = {
  pids: string
}
export const getSongsDetails = createAsyncThunk(
  "songDetails",
  async (props: Props, Async) => {
    try {
      const response = await Interceptors.get("", {
        params: {
          ...endPoints.songDetails,
          pids: props.pids
        }
      })
      return response.data
    } catch (error: any) {
      return Async.rejectWithValue(error.message)
    }
  }
)
