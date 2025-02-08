import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { InteractionManager } from "react-native"
import fs from "react-native-fs"
import { LocalMediaInterface } from "../Interfaces/localMedia.interface"
import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import { ApplicationCore } from "../native/MusicFiles"
import { addLocalFiles } from "../store/slices/offline.slice"

export interface OfflineSongTypes {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  path: string
  artwork: string
}

class LocalMediaService implements LocalMediaInterface {
  private path: string

  constructor() {
    this.path = `${fs.ExternalStorageDirectoryPath}/Music`
  }

  private checkDir = async (): Promise<void> => {
    try {
      if (!(await fs.exists(this.path))) await fs.mkdir(this.path)
    } catch (error) {
      console.log(error)
    }
  }

  public getLocalmedia = async (
    dispatch: Dispatch<UnknownAction>
  ): Promise<boolean> => {
    try {
      const musicFiles = await ApplicationCore.getMusicFiles()
      let data: StoreSongTypes[] = new Array<StoreSongTypes>()

      data = musicFiles.map((cx) => {
        const { id, title, artist, artwork, path } = cx
        return {
          id,
          title,
          artist,
          artwork,
          url: path
        } as StoreSongTypes
      })

      dispatch(addLocalFiles(data))
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
  public downloadSong = async (
    c: StoreSongTypes,
    updateDownloadValue: (progress: number) => void
  ): Promise<void> => {
    try {
      await this.checkDir()
      let lastUpdateTime = Date.now()

      const task = fs.downloadFile({
        fromUrl: c.url,
        toFile: `${this.path}/${c.title.concat(".mp3")}`,
        background: true,
        discretionary: true,
        progress: (res) => {
          const now = Date.now()
          if (now - lastUpdateTime > 500) {
            lastUpdateTime = now
            requestAnimationFrame(() => {
              updateDownloadValue(
                Math.floor((res.bytesWritten / res.contentLength) * 100)
              )
            })
          }
        }
      })

      task.promise
        .then((response) => {
          InteractionManager.runAfterInteractions(() => {
            setImmediate(async () => {
              await ApplicationCore.scanFile(
                `${this.path}/${c.title.concat(".mp3")}`
              )
              updateDownloadValue(0)
            })
          })
        })

        .catch((err) => {
          console.log("Download error:", err)
        })
    } catch (error) {
      console.log("Eroor downloading song...")
    }
  }
}
export const musicService = new LocalMediaService()
