import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../api/base/endpoint"
import { HomeDataRequest } from "../../api/interface/module.interface"
import { PayloadService } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
class HomeService extends PayloadService {
  public getHomeData = createAsyncThunk("@home", async (_, Async): Promise<any> => {
    try {
      const data = await Interceptors.get("", {
        params: { ...endPoints.homeData },
        responseType: "json"
      })
      const HomeData: HomeDataRequest = {
        tuneifyTrendingAlbums: data.data.new_trending,
        tuneifyTopPlaylists: data.data.top_playlists,
        tuneifyCharts: data.data.charts,
        tuneifyAlbums: data.data.new_albums
      }
      return this.homePayload(HomeData)
    } catch (err: any) {
      return Async.rejectWithValue(err?.message)
    }
  })
}
export const homeService = new HomeService()
