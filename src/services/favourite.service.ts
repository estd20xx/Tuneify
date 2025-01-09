import { Track } from "react-native-track-player"
import { Ifavourites } from "../Interfaces/favourite.interfacee"
export default class FavouriteService implements Ifavourites {
  public addToFav = (currentSong: Track) => {}
  public getRandomNumber = (end: number): number => {
    return Math.floor(Math.random() * end)
  }
}
