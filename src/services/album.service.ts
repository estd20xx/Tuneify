import axios from 'axios'
import {SeperateAlbumTypes} from '../Types/Types'
import {Ialbum} from '../Interfaces/album.interface'
export default class AlbumService implements Ialbum {
  constructor(public albumApi: string) {}
  getUrl = (): string => {
    return this.albumApi
  }
  getAlbums = async (
    setCAlb: (albums: SeperateAlbumTypes[]) => void,
    setIsl: (isL: boolean) => void,
  ): Promise<void> => {
    try {
      const result = await axios.get(this.getUrl())
      setCAlb(result.data.data.results)
      setIsl(false)
    } catch (error) {
      console.log('something went wrong in album')
    }
  }
}
