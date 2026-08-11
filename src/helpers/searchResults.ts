import { DynamicResponse } from "../api/interface/Dynamic.interface"
import { SearchCategory } from "../components/Search/Category"
import { Song } from "../api/service/Payload.service"

export interface SearchRow {
  id: string
  title: string
  subtitle: string
  image: string
  song: Song | null
}

const imageOf = (images: Array<{ link: string }> | undefined): string => {
  if (!images || !images.length) return ""
  return (images[1] ?? images[images.length - 1]).link
}

const fromSong = (song: Song): SearchRow => ({
  id: song?.id ?? "",
  title: song?.title ?? "",
  subtitle: song?.artist ?? "",
  image: imageOf(song?.image),
  song
})

const fromDynamic = (entry: any, subtitle: string): SearchRow => ({
  id: entry?.id ?? "",
  title: entry?.title ?? "",
  subtitle,
  image: imageOf(entry?.image),
  song: null
})

export const buildSearchRows = (
  category: SearchCategory,
  songs: Song[] | undefined | null,
  dynamic: DynamicResponse | null | undefined
): SearchRow[] => {
  if (category === "top" || category === "songs") {
    return (songs ?? []).filter((s) => s && s.id).map(fromSong)
  }
  if (category === "artists") {
    return (dynamic?.artists ?? []).map((a: any) => fromDynamic(a, "Artist"))
  }
  if (category === "playlists") {
    return (dynamic?.playlists ?? []).map((p: any) =>
      fromDynamic(p, p?.more_info?.artist_name || "Playlist")
    )
  }
  if (category === "albums") {
    return (dynamic?.albums ?? []).map((a: any) =>
      fromDynamic(a, a?.more_info?.music || "Album")
    )
  }
  return []
}
