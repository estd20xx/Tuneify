import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { Image } from "react-native"
import fs from "react-native-fs"
import tempImage from "../assets/images/new.png"
import { LocalMediaInterface } from "../Interfaces/localMedia.interface"
import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import { addLocalFiles } from "../store/slices/offline.slice"
const localImage = Image.resolveAssetSource(tempImage).uri
export default class LocalMediaService implements LocalMediaInterface {
  public getMusicFilesRecursively = async (dirPath: string) => {
    interface MusicInterface {
      name: string
      path: string
    }
    let musicFiles: MusicInterface[] = []
    try {
      const items = await fs.readDir(dirPath)
      for (const item of items) {
        if (item.isDirectory() && (item.name === "Android" || dirPath.includes("/Android"))) {
          continue
        }
        if (item.isFile() && item.name.match(/\.(mp3|m4a|wav|aac)$/i)) {
          musicFiles.push({
            name: item.name,
            path: item.path
          })
        } else if (item.isDirectory()) {
          const subDirMusicFiles = await this.getMusicFilesRecursively(item.path)
          musicFiles = musicFiles.concat(subDirMusicFiles)
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error)
    }
    return musicFiles
  }
  public getLocalmedia = async (dispatch: Dispatch<UnknownAction>): Promise<boolean> => {
    try {
      const externalStoragePath = fs.ExternalStorageDirectoryPath
      const musicFiles = await this.getMusicFilesRecursively(externalStoragePath)
      let data: StoreSongTypes[] = new Array<StoreSongTypes>()
      data = musicFiles.map((cx, index) => {
        return {
          id: String(index) + cx.name[0] + "l",
          title: cx.name,
          artist: "<namelessnerd>",
          artwork: localImage,
          url: cx.path
        } as StoreSongTypes
      })
      data.sort((a, b) => a.title.localeCompare(b.title))
      dispatch(addLocalFiles(data))
      return true
    } catch (error) {
      return false
    }
  }
}
