import axios from "axios"
import { PayloadService } from "./Payload.service"
import { AlbumDetailsResponse } from "../interface/album.interface"
import { endPoints, baseURL } from "../base/endpoint"
export class ApiAlbumService extends PayloadService {
  public getAlbumSongs = async (id: string): Promise<AlbumDetailsResponse> => {
    const data = await axios.get(baseURL, {
      params: {
        ...endPoints.albumDetails,
        albumid: id,
      },
    })
    const finalData = this.albumPayload(data.data)
    return finalData
  }
}
