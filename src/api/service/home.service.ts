import axios from "axios"
import {HomeDataRequest, HomeDataResponse} from "../interface/module.interface"
import {PayloadService} from "./Payload.service"
const service = new PayloadService()
export class HomeService {
  public getHomeData = async (): Promise<HomeDataResponse> => {
    console.log("called")
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
      tuneifyTrendingAlbums: data.data.new_trending, // image list
      tuneifyTopPlaylists: data.data.top_playlists,
      tuneifyCharts: data.data.charts, //Top floavour ==> Topic
      tuneifyAlbums: data.data.new_albums, // image list
    }
    const finalData = service.homePayload(HomeData)
    console.log(finalData)
    return finalData
  }
}
