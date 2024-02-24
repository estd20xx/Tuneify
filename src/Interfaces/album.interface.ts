import {SeperateAlbumTypes} from "../Types/Types"
export interface Ialbum {
  readonly getUrl: () => string
  getAlbums: (
    setCAlb: (albums: SeperateAlbumTypes[]) => void,
    setIsl: (isL: boolean) => void,
  ) => Promise<void>
}
