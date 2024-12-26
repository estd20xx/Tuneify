import { AlbumDetailsRequest, AlbumDetailsResponse } from "../interface/album.interface"
import { HomeDataRequest, HomeDataResponse } from "../interface/module.interface"
import {
  Audio,
  createDownloadLinks,
  handleArtists,
  handleImageVariation,
  Image
} from "../utils/utils"
import { ApiService } from "./api.service"
export interface Song {
  id: string
  title: string
  type: string
  image: Image[]
  language: string
  year: string
  play_count: string
  link: Audio[] // more_info.encrp
  artist: string // more_info.music
}
export interface SearchedSongs {
  songs: Song[]
}
export class PayloadService extends ApiService {
  protected homePayload(homeDataRequest: HomeDataRequest): HomeDataResponse {
    const homeDataPayload: HomeDataResponse = {
      tuneifyTrendingAlbumsResponse: homeDataRequest.tuneifyTrendingAlbums.map((current) => {
        return {
          id: current.id,
          title: current.title,
          subtitle: current.subtitle,
          header_desc: current.subtitle,
          type: current.type,
          perma_url: current.perma_url,
          artwork: handleImageVariation(current.image),
          language: current.language,
          year: current.year,
          release_date: current.more_info.release_date,
          song_count: current.more_info.song_count,
          artists: current.more_info.artistMap?.artists
        }
      }),
      tuneifyTopPlaylistsResponse: homeDataRequest.tuneifyTopPlaylists.map((current) => {
        return {
          id: current.id,
          title: current.title,
          subtitle: current.subtitle,
          type: current.type,
          artwork: handleImageVariation(current.image),
          perma_url: current.perma_url,
          more_info: {
            song_count: current.more_info.song_count,
            firstname: current.more_info.firstname,
            follower_count: current.more_info.follower_count,
            last_updated: current.more_info.last_updated,
            uid: current.more_info.uid
          }
        }
      }),
      tuneifyChartsResponse: homeDataRequest.tuneifyCharts.map((current) => {
        return {
          id: current.id,
          title: current.title,
          subtitle: current.subtitle,
          type: current.type,
          artwork: handleImageVariation(current.image),
          perma_url: current.perma_url
        }
      }),
      tuneifyAlbumsResponse: homeDataRequest.tuneifyAlbums.map((current) => {
        return {
          id: current.id,
          title: current.title,
          subtitle: current.subtitle,
          header_desc: current.header_desc,
          type: current.type,
          perma_url: current.perma_url,
          artwork: handleImageVariation(current.image),
          language: current.language,
          year: current.year,
          release_date: current.more_info.release_date,
          song_count: current.more_info.song_count,
          artists: current.more_info.artistMap?.artists
        }
      })
    }
    return homeDataPayload
  }
  protected albumPayload(albumDetails: AlbumDetailsRequest): AlbumDetailsResponse {
    return {
      id: albumDetails.id,
      title: albumDetails.title,
      subtitle: albumDetails.subtitle,
      header_desc: albumDetails.header_desc,
      type: albumDetails.type,
      artwork: handleImageVariation(albumDetails.image),
      year: albumDetails.year,
      list_count: albumDetails.list_count,
      list_type: albumDetails.list_type,
      songs: albumDetails.list.map((current) => {
        return {
          id: current.id,
          title: current.title,
          subtitle: current.subtitle,
          image: handleImageVariation(current.image),
          year: current.year,
          play_count: current.play_count,
          songLink: createDownloadLinks(current.more_info.encrypted_media_url),
          duration: current.more_info.duration,
          artists: handleArtists(current.more_info.artistMap.primary_artists),
          has_lyrics: current.more_info.has_lyrics
        }
      })
    }
  }
  protected searchedSongPayload = (data: any): SearchedSongs => {
    return {
      songs: data?.results?.map((current: any) => {
        return {
          id: current?.id,
          title: current?.title,
          type: current?.type,
          image: handleImageVariation(current.image),
          language: current?.language,
          year: current?.year,
          play_count: current?.play_count,
          link: createDownloadLinks(current?.more_info?.encrypted_media_url),
          artist: current?.more_info?.music
        }
      })
    }
  }
}
