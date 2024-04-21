import axios from "axios"
import {
  HomeDataRequest,
  HomeDataResponse,
} from "../interface/module.interface"
import { PayloadService } from "./Payload.service"
import { baseURL, endPoints } from "../base/endpoint"
export class HomeService extends PayloadService {
  public getHomeData = async (): Promise<HomeDataResponse> => {
    const data = await axios.get(baseURL, {
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
}
