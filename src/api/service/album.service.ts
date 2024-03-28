import axios from "axios"
import {PayloadService} from "./Payload.service"
import {AlbumDetailsResponse} from "../interface/album.interface"

export class ApiAlbumService extends PayloadService {
  public getAlbumSongs = async (id: string): Promise<AlbumDetailsResponse> => {
    const data = await axios.get("https://www.jiosaavn.com/api.php", {
      params: {
        _format: "json",
        _marker: 0,
        api_version: 4,
        ctx: "web6dot0",
        __call: "content.getAlbumDetails",
        cc: "in",
        albumid: id,
      },
    })
    const finalData = this.albumPayload(data.data)
    return finalData
  }
}
