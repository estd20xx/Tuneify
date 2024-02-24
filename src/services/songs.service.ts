import axios from 'axios'
import {Isongs} from '../Interfaces/songs.interface'
import {SongsTypes} from '../Types/Types'
export default class SongService implements Isongs {
  constructor(public songApi: string) {}
  getUrl = (): string => {
    return this.songApi
  }
  getSongs = async (setSng: (songs: SongsTypes[]) => void): Promise<void> => {
    try {
      const result = await axios.get(this.getUrl())
      setSng(result.data.data.results)
    } catch (error) {
      console.log('something went wrong in songs')
    }
  }
}
