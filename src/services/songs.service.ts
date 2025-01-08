import { Isongs, SongsTypes } from "../Interfaces/songs.interface"
// TODO : handle specific song click
export default class SongService implements Isongs {
  constructor(public songApi: string) {}
  getSongs = async (setSng: (songs: SongsTypes[]) => void): Promise<void> => {
    try {
      // const result = await axios.get(this.getUrl())
      // setSng(result.data.data.results)
    } catch (error) {
      console.log("something went wrong in songs")
    }
  }
}
