import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import { ChildPlaylistInterface } from "../store/slices/offlinePlaylist.slice"

export const normalizePlaylistName = (name: string): string =>
  (name ?? "").trim().toLowerCase()

export const dedupeSongs = (
  songs: Array<StoreSongTypes> | undefined | null
): Array<StoreSongTypes> => {
  if (!songs) return []
  const seen = new Set<string>()
  const unique: Array<StoreSongTypes> = []
  for (const song of songs) {
    if (!song || !song.id) continue
    if (seen.has(song.id)) continue
    seen.add(song.id)
    unique.push(song)
  }
  return unique
}

export const containsSong = (
  songs: Array<StoreSongTypes> | undefined | null,
  id: string
): boolean => {
  if (!songs) return false
  return songs.some((song) => song?.id === id)
}

export const mergeSongs = (
  existing: Array<StoreSongTypes> | undefined | null,
  incoming: Array<StoreSongTypes> | undefined | null
): Array<StoreSongTypes> => dedupeSongs([...(existing ?? []), ...(incoming ?? [])])

export const findPlaylistIndex = (
  playlists: Array<Array<ChildPlaylistInterface>>,
  name: string
): number => {
  const target = normalizePlaylistName(name)
  return playlists.findIndex(
    (entry) => normalizePlaylistName(entry?.[0]?.name) === target
  )
}

export const uniquePlaylistName = (
  playlists: Array<Array<ChildPlaylistInterface>>,
  name: string
): string => {
  const base = (name ?? "").trim() || "Playlist"
  if (findPlaylistIndex(playlists, base) === -1) return base
  let suffix = 2
  while (findPlaylistIndex(playlists, `${base} (${suffix})`) !== -1) suffix++
  return `${base} (${suffix})`
}
