import axios from "axios"
import Isuggested from "../Interfaces/suggested.interface"
import {
  AlbumTypes,
  ChartsTypes,
  Http,
  PlaylistTypes,
  TrendingAlbumTypes,
  TrendingSongTypes,
} from "../Types/Types"
import {api} from "../api/api"
export default class SuggestedServices implements Isuggested {
  public wait = async (timeout: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }
  public randomGenerator = (initial: number, final: number): number => {
    const randomNumber = Math.floor(Math.random() * final) + initial
    return randomNumber
  }
  public http = async <Http>(url: string): Promise<Http> => {
    const data = await axios.get(url)
    return data.data
  }
  public getSuggestedData = async (
    setAlbums: (albums: AlbumTypes[]) => void,
    setPlst: (playlist: PlaylistTypes[]) => void,
    setChst: (charts: ChartsTypes[]) => void,
    setLd: (ld: boolean) => void,
    setTrndSong: (trndSong: TrendingSongTypes[]) => void,
    setTrndAlb: (trndAlbum: TrendingAlbumTypes[]) => void,
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
