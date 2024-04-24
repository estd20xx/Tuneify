import axios from "axios"
import { endPoints } from "../../api/base/endpoint"
import { PayloadService } from "../../api/service/Payload.service"
import {
  HomeDataRequest,
  HomeDataResponse,
} from "../../api/interface/module.interface"
import { createAsyncThunk } from "@reduxjs/toolkit"
class HomeService extends PayloadService {
  public getHomeData = createAsyncThunk(
    "@home",
    async (): Promise<HomeDataResponse> => {
      const data = await axios.get(this.getApi(), {
        params: { ...endPoints.homeData },
        responseType: "json",
      })
      const HomeData: HomeDataRequest = {
        tuneifyTrendingAlbums: data.data.new_trending,
        tuneifyTopPlaylists: data.data.top_playlists,
        tuneifyCharts: data.data.charts,
        tuneifyAlbums: data.data.new_albums,
      }
      const finalData = this.homePayload(HomeData)
      return finalData
    }
  )
}
export const homeService = new HomeService()
