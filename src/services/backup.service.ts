import fs from "react-native-fs"
import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import { ChildPlaylistInterface } from "../store/slices/offlinePlaylist.slice"

export interface BackupShape {
  version: number
  createdAt: string
  playlists: Array<Array<ChildPlaylistInterface>>
  favourites: Array<StoreSongTypes>
}

export const BACKUP_VERSION = 1

export const buildBackup = (
  playlists: Array<Array<ChildPlaylistInterface>>,
  favourites: Array<StoreSongTypes>
): BackupShape => ({
  version: BACKUP_VERSION,
  createdAt: new Date().toISOString(),
  playlists: playlists ?? [],
  favourites: favourites ?? []
})

export const parseBackup = (raw: string): BackupShape | null => {
  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object") return null
    if (parsed.version !== BACKUP_VERSION) return null
    if (!Array.isArray(parsed.playlists)) return null
    if (!Array.isArray(parsed.favourites)) return null
    return parsed as BackupShape
  } catch (error) {
    return null
  }
}

class BackupService {
  private file = `${fs.DocumentDirectoryPath}/tuneify-backup.json`

  public getPath = (): string => this.file

  public save = async (data: BackupShape): Promise<boolean> => {
    try {
      await fs.writeFile(this.file, JSON.stringify(data), "utf8")
      return true
    } catch (error) {
      return false
    }
  }

  public load = async (): Promise<BackupShape | null> => {
    try {
      if (!(await fs.exists(this.file))) return null
      const raw = await fs.readFile(this.file, "utf8")
      return parseBackup(raw)
    } catch (error) {
      return null
    }
  }
}

export const backupService = new BackupService()
