import {
  AlbumDetailsRequest,
  AlbumDetailsResponse
} from "../interface/album.interface"
import { DynamicResponse } from "../interface/Dynamic.interface"
import {
  HomeDataRequest,
  HomeDataResponse,
  PlayListRequest,
  PlaylistResponseOnce
} from "../interface/module.interface"
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
      tuneifyTrendingAlbumsResponse: homeDataRequest.tuneifyTrendingAlbums.map(
        (current) => {
          return {
            id: current.id,
            title: current.title.replaceAll("&quot;", '"'),
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
        }
      ),
      tuneifyTopPlaylistsResponse: homeDataRequest.tuneifyTopPlaylists.map(
        (current) => {
          return {
            id: current.id,
            title: current.title.replaceAll("&quot;", '"'),
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
        }
      ),
      tuneifyChartsResponse: homeDataRequest.tuneifyCharts.map((current) => {
        return {
          id: current.id,
          title: current.title.replaceAll("&quot;", '"'),
          subtitle: current.subtitle,
          type: current.type,
          artwork: handleImageVariation(current.image),
          perma_url: current.perma_url
        }
      }),
      tuneifyAlbumsResponse: homeDataRequest.tuneifyAlbums.map((current) => {
        return {
          id: current.id,
          title: current.title.replaceAll("&quot;", '"'),
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
  protected albumPayload(
    albumDetails: AlbumDetailsRequest
  ): AlbumDetailsResponse {
    return {
      id: albumDetails.id,
      title: albumDetails.title.replaceAll("&quot;", '"'),
      subtitle: albumDetails.subtitle,
      header_desc: albumDetails.header_desc,
      type: albumDetails.type,
      artwork: handleImageVariation(albumDetails.image),
      year: albumDetails.year,
      list_count: albumDetails.list_count,
      list_type: albumDetails.list_type,
      songs: albumDetails.list.map((current) => {
        /**
         * 
         *  id: string
  title: string
  artist: string
  artwork: string
  url: string
         */
        return {
          id: current.id,
          title: current.title.replaceAll("&quot;", '"'),
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
  protected playlistPayload = (
    playListData: PlayListRequest
  ): PlaylistResponseOnce => {
    return {
      id: playListData.id,
      title: playListData.title.replaceAll("&quot;", '"'),
      type: playListData.type,
      image: handleImageVariation(playListData?.image),
      year: playListData.year,
      subtitle: playListData.subtitle,
      header_desc: playListData.header_desc,
      perma_url: playListData.perma_url,
      language: playListData.language,
      play_count: playListData.play_count,
      explicit_content: playListData.explicit_content,
      list_count: playListData.list_count,
      list_type: playListData.list_type,
      list: playListData.list.map((current) => {
        return {
          id: current.id,
          title: current.title.replaceAll("&quot;", '"'),
          type: current.type,
          image: handleImageVariation(current.image),
          year: current.year,
          subtitle: playListData.subtitle,
          header_desc: playListData.header_desc,
          perma_url: playListData.perma_url,
          language: playListData.language,
          play_count: playListData.play_count,
          explicit_content: playListData.explicit_content,
          list_count: playListData.list_count,
          list_type: playListData.list_type,
          more_info: {
            music: current.more_info.music,
            album_id: current.more_info.album_id,
            album: current.more_info.album,
            label: current.more_info.label,
            origin: current.more_info.origin,
            songLink: createDownloadLinks(
              current.more_info.encrypted_media_url
            ),
            duration: current.more_info.duration,
            artists: current?.more_info?.artists?.map((currentArtist) => {
              return {
                id: currentArtist.id,
                name: currentArtist.name,
                image: handleImageVariation(currentArtist.image),
                type: currentArtist.type,
                perma_url: currentArtist.perma_url,
                role: currentArtist.role
              }
            })
          }
        }
      })
    }
  }
  protected searchedSongPayload = (data: any): SearchedSongs => {
    return {
      songs: data?.results?.map((current: any) => {
        return {
          id: current?.id,
          title: current?.title.replaceAll("&quot;", '"'),
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
  protected dynamicSearchPayload = (data: any): DynamicResponse => {
    const DynamicResponse: DynamicResponse = {
      top: data?.data?.topquery?.data?.map((current: any) => {
        return {
          id: current.id,
          title: current.title.replaceAll("&quot;", '"'),
          type: current.type,
          image: handleImageVariation(current.image)
        }
      }),
      songs: data?.data?.songs?.data?.map((current: any) => {
        return {
          id: current.id,
          title: current.title.replaceAll("&quot;", '"'),
          type: current.type,
          image: handleImageVariation(current.image),
          perma_url: current.perma_url,
          more_info: {
            album: current.more_info.album,
            album_id: current.more_info.album_id,
            primary_artists: current.more_info.primary_artists,
            singers: current.more_info.singers
          },
          descriptions: current.descriptions
        }
      }),
      artists: data?.data?.artists?.data?.map((current: any) => {
        return {
          id: current.id,
          title: current.title.replaceAll("&quot;", '"'),
          type: current.type,
          image: handleImageVariation(current.image)
        }
      }),
      playlists: data?.data?.playlists?.data?.map((current: any) => {
        return {
          id: current.id,
          title: current.title.replaceAll("&quot;", '"'),
          type: current.type,
          image: handleImageVariation(current.image),
          perma_url: current.perma_url,
          more_info: {
            artist_name: current.more_info.artist_name,
            entity_type: current.more_info.entity_type
          }
        }
      }),
      albums: data?.data?.albums?.data?.map((current: any) => {
        return {
          id: current.id,
          title: current.title.replaceAll("&quot;", '"'),
          type: current.type,
          image: handleImageVariation(current.image),
          perma_url: current.perma_url,
          more_info: {
            music: current.more_info.music,
            year: current.more_info.year,
            language: current.more_info.language
          },
          song_pids: current.song_pids,
          descriptions: current.descriptions
        }
      })
    }
    return DynamicResponse
  }
}

// id: string
// title: string
// type: string
// image: Image[]

// language: string
// year: string
// play_count: string

// link: Audio[] // more_info.encrp
// artist: string // more_info.music

export const payloadService = new PayloadService()
