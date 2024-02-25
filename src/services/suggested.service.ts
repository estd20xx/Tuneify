import axios from "axios"
import Isuggested, {Http} from "../Interfaces/suggested.interface"
import {api} from "../api/api"
import {AlbumTypes, TrendingAlbumTypes} from "../Interfaces/album.interface"
import {PlaylistTypes} from "../Interfaces/playlist.interface"
import {ChartsTypes} from "../Types/Types"
import {TrendingSongTypes} from "../Interfaces/songs.interface"
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
