import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import { ChildPlaylistInterface } from "../store/slices/offlinePlaylist.slice"
import { dedupeSongs } from "./playlist"

export const QR_PAYLOAD_LIMIT = 2800
export const SHARE_HEADER = "TFY1"

const FIELD = "\t"
const RECORD = "\n"

const URL_PREFIXES: Array<[string, string]> = [
  ["1", "https://aac.saavncdn.com/"],
  ["2", "https://c.saavncdn.com/"],
  ["3", "https://archive.org/download/"],
  ["4", "https://archive.org/services/get-item-image.php?identifier="]
]

const URL_SUFFIXES: Array<[string, string]> = [
  ["1", "-500x500.jpg"],
  ["2", "_320.mp4"],
  ["3", "-150x150.jpg"],
  ["4", "-50x50.jpg"]
]

const shrinkUrl = (value: string): string => {
  const raw = value ?? ""
  let prefixCode = "0"
  let body = raw
  for (const [code, prefix] of URL_PREFIXES) {
    if (raw.startsWith(prefix) && raw.length - prefix.length < body.length) {
      prefixCode = code
      body = raw.slice(prefix.length)
    }
  }
  let suffixCode = "0"
  for (const [code, suffix] of URL_SUFFIXES) {
    if (body.endsWith(suffix)) {
      suffixCode = code
      body = body.slice(0, body.length - suffix.length)
      break
    }
  }
  return `${prefixCode}${suffixCode}${body}`
}

const growUrl = (value: string): string => {
  if (!value || value.length < 2) return ""
  const prefix = URL_PREFIXES.find(([code]) => code === value[0])
  const suffix = URL_SUFFIXES.find(([code]) => code === value[1])
  const body = value.slice(2)
  return `${prefix ? prefix[1] : ""}${body}${suffix ? suffix[1] : ""}`
}

const clean = (value: string | undefined): string =>
  (value ?? "").replace(/[\t\r\n]+/g, " ").trim()

export const packPlaylist = (playlist: ChildPlaylistInterface): string => {
  const songs = dedupeSongs(playlist?.songs)
  const rows = songs.map((song) =>
    [
      clean(song.id),
      clean(song.title),
      clean(song.artist),
      shrinkUrl(clean(song.artwork)),
      shrinkUrl(clean(song.url))
    ].join(FIELD)
  )
  return [SHARE_HEADER + clean(playlist?.name), ...rows].join(RECORD)
}

export const unpackPlaylist = (
  packed: string
): ChildPlaylistInterface | null => {
  if (!packed || typeof packed !== "string") return null
  if (!packed.startsWith(SHARE_HEADER)) return null
  const records = packed.split(RECORD)
  const name = records[0].slice(SHARE_HEADER.length)
  const songs: Array<StoreSongTypes> = []
  for (let i = 1; i < records.length; i++) {
    const parts = records[i].split(FIELD)
    if (parts.length !== 5) continue
    const [id, title, artist, artwork, url] = parts
    if (!id) continue
    songs.push({
      id,
      title,
      artist,
      artwork: growUrl(artwork),
      url: growUrl(url)
    })
  }
  if (!songs.length) return null
  return { name, songs: dedupeSongs(songs) }
}
