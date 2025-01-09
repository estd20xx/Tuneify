import { SongInterface, SongsTypes } from "../Interfaces/songs.interface"
// TODO : handle specific song click
export default class SongService implements SongInterface {
  constructor(public songApi: string) {}
  getSongs = async (setSng: (songs: SongsTypes[]) => void): Promise<void> => {
    try {
    } catch (error) {
      console.log("something went wrong in songs")
    }
  }
}
