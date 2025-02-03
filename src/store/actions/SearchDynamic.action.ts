import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints, headers } from "../../api/base/endpoint"
import { PayloadService } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
interface Props {
  query: string
  signal: AbortSignal
}

class PersonalizedDynamicSearch extends PayloadService {
  public searchDynamicHandler = createAsyncThunk(
    "searchDynamic",
    async (props: Props, Async) => {
      try {
        const response = await Interceptors.get("", {
          params: {
            ...endPoints.searchDynamic,
            query: props.query
          },
          signal: props.signal,
          headers
        })
        return this.dynamicSearchPayload(response)
      } catch (error: any) {
        return Async.rejectWithValue(error.message)
      }
    }
  )
}
export const personalizedDynamic = new PersonalizedDynamicSearch()
