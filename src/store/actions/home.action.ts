import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { endPoints } from "../../api/base/endpoint"
import {
  HomeDataRequest,
  HomeDataResponse,
} from "../../api/interface/module.interface"
import { PayloadService } from "../../api/service/Payload.service"
class HomeService extends PayloadService {
  public getHomeData = createAsyncThunk(
    "@home",
    async (): Promise<HomeDataResponse> => {
      const data = await axios.get(this.getApi(), {
        params: { ...endPoints.homeData },
        responseType: "json",
      })
      const { new_trending, top_playlists, charts, new_albums } = data.data
      const HomeData: HomeDataRequest = {
        tuneifyTrendingAlbums: new_trending,
        tuneifyTopPlaylists: top_playlists,
        tuneifyCharts: charts,
        tuneifyAlbums: new_albums,
      }
      return this.homePayload(HomeData)
    }
  )
}
export const homeService = new HomeService()
