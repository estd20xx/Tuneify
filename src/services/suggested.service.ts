import axios from "axios"
import { SongsTypes } from "../Interfaces/songs.interface"
import Isuggested, { Http } from "../Interfaces/suggested.interface"
import { api } from "../api/api"
import { AlbumResponse, ChartsResponse, PlaylistResponse } from "../api/interface/module.interface"
export default class SuggestedServices implements Isuggested {
  public randomGenerator = (initial: number, final: number): number => {
    const randomNumber = Math.floor(Math.random() * final) + initial
    return randomNumber
  }
  public http = async <Http>(url: string): Promise<Http> => {
    const data = await axios.get(url)
    return data.data
  }
  public getSuggestedData = async (
    setAlbums: (albums: AlbumResponse[]) => void,
    setPlst: (playlist: PlaylistResponse[]) => void,
    setChst: (charts: ChartsResponse[]) => void,
    setLd: (ld: boolean) => void,
    setTrndSong: (trndSong: SongsTypes[]) => void,
    setTrndAlb: (trndAlbum: AlbumResponse[]) => void
  ) => {
    try {
      const result = await this.http<Http>(api)
      setAlbums(result.data.albums)
      setPlst(result.data.playlists)
      setChst(result.data.charts)
      setLd(false)
      setTrndSong(result.data.trending["songs"])
      setTrndAlb(result.data.trending["albums"])
    } catch (error) {
      console.log("somthing went wrong suggested")
    }
  }
}
