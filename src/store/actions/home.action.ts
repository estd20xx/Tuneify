import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { endPoints } from "../../api/base/endpoint"
import { HomeDataRequest } from "../../api/interface/module.interface"
import { PayloadService } from "../../api/service/Payload.service"
class HomeService extends PayloadService {
  public getHomeData = createAsyncThunk("@home", async (_, Async): Promise<any> => {
    try {
      const data = await axios.get(this.getApi(), {
        params: { ...endPoints.homeData },
        responseType: "json"
      })
      const HomeData: HomeDataRequest = {
        tuneifyTrendingAlbums: data.data.new_trending,
        tuneifyTopPlaylists: data.data.top_playlists,
        tuneifyCharts: data.data.charts,
        tuneifyAlbums: data.data.new_albums
      }
      const finalData = this.homePayload(HomeData)
      return finalData
    } catch (err: any) {
      return Async.rejectWithValue(err?.message)
    }
  })
}
export const homeService = new HomeService()
