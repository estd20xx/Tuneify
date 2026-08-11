import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import { DownloadedMeta } from "../store/slices/downloads.slice"

const UNKNOWN = ["", "<unknown>", "unknown", "null", "undefined"]

export const isMissing = (value: string | undefined | null): boolean =>
  UNKNOWN.includes((value ?? "").trim().toLowerCase())

export const mergeDownloadMeta = (
  songs: Array<StoreSongTypes> | undefined | null,
  byPath: Record<string, DownloadedMeta> | undefined | null
): Array<StoreSongTypes> => {
  if (!songs) return []
  if (!byPath) return songs
  return songs.map((song) => {
    const meta = byPath[song?.url]
    if (!meta) return song
    return {
      ...song,
      title: isMissing(song.title) ? meta.title : song.title,
      artist: isMissing(song.artist) ? meta.artist : song.artist,
      artwork: isMissing(song.artwork) ? meta.artwork : song.artwork
    }
  })
}
