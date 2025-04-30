import { endPoints } from "../../api/base/endpoint"
import { AlbumDetailsResponse } from "../../api/interface/album.interface"
import {
  HomeDataRequest,
  HomeDataResponse,
  PlayListRequest,
  PlaylistResponseOnce
} from "../../api/interface/module.interface"
import { PayloadService } from "../../api/service/Payload.service"
import { Interceptors } from "../../lib/axios"
class HomeService extends PayloadService {
  public getHomeData = async (): Promise<HomeDataResponse> => {
    const response = await Interceptors.get("", {
      params: { ...endPoints.homeData },
      responseType: "json"
    })
    const HomeData: HomeDataRequest = {
      tuneifyTrendingAlbums: response.data.new_trending,
      tuneifyTopPlaylists: response.data.top_playlists,
      tuneifyCharts: response.data.charts,
      tuneifyAlbums: response.data.new_albums
    }
    return this.homePayload(HomeData)
  }
  public getPlaylistsSongs = async (
    id: string
  ): Promise<PlaylistResponseOnce> => {
    const response = await Interceptors.get<PlayListRequest>("", {
      params: { ...endPoints.playlistDetails, listid: id }
    })
    return this.playlistPayload(response.data)
  }
  public getAlbumSongs = async (id: string): Promise<AlbumDetailsResponse> => {
    const data = await Interceptors.get("", {
      params: {
        ...endPoints.albumDetails,
        albumid: id
      }
    })
    return this.albumPayload(data.data)
  }
  // need to change same as getPlaylistSongs
  public albumPlaylist = async (id: string): Promise<PlaylistResponseOnce> => {
    const data = await Interceptors.get<PlayListRequest>("", {
      params: {
        ...endPoints.playlistDetails,
        listid: id
      }
    })
    return this.playlistPayload(data.data)
  }
}
export const homeService = new HomeService()
