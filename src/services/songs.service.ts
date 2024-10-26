import axios from "axios"
import { Isongs, SongsTypes } from "../Interfaces/songs.interface"
export default class SongService implements Isongs {
  constructor(public songApi: string) {}
  getUrl = (): string => {
    console.log(this.songApi)
    return this.songApi
  }
  getSongs = async (setSng: (songs: SongsTypes[]) => void): Promise<void> => {
    try {
      // const result = await axios.get(this.getUrl())
      // setSng(result.data.data.results)
    } catch (error) {
      console.log("something went wrong in songs")
    }
  }
}
