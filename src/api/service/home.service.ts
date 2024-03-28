import axios from "axios"
import {HomeDataRequest, HomeDataResponse} from "../interface/module.interface"
import {PayloadService} from "./Payload.service"
export class HomeService extends PayloadService {
  public getHomeData = async (): Promise<HomeDataResponse> => {
    const data = await axios.get("https://www.jiosaavn.com/api.php", {
      params: {
        _format: "json",
        _marker: 0,
        api_version: 4,
        ctx: "web6dot0",
        __call: "webapi.getLaunchData",
      },
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
