export const constrants = {
  colorOrange: "#ff8216",
  colorLightGray: "#a1a0a3",
  colorDark: "#181a20"
}

export const baseApi: string = "https://www.jiosaavn.com/api.php"
export const onBoardImageApi =
  "https://firebasestorage.googleapis.com/v0/b/threads-890e1.appspot.com/o/pexels-photo-3756767.jpeg?alt=media&token=40a0a408-9fa3-4e2d-96c2-c15abc3b8ed1"

const commonParams =
  "q=collection:(librivoxaudio)&fl=runtime,avg_rating,num_reviews,title,description,identifier,creator,date,downloads,subject,item_size,language"

export const latestAudiobook = `https://archive.org/advancedsearch.php?${commonParams}&sort[]=addeddate+desc&output=json`
export const mostViewedInThisWeek = `https://archive.org/advancedsearch.php?${commonParams}&sort[]=week+desc&output=json`
export const mostDownloadedOfAllTime = `https://archive.org/advancedsearch.php?${commonParams}&sort[]=downloads+desc&output=json`
export const audioBookImageBaseUrl =
  "https://archive.org/services/get-item-image.php?identifier="

export const baseApiMetaData = "https://archive.org/metadata/"
export const audioBaseApiAudio = "https://archive.org/download/"
export const audioMetaDataFileType = "/files?output=json"
export const qualities = [
  { id: "_12", bitrate: "12kbps" },
  { id: "_48", bitrate: "48kbps" },
  { id: "_96", bitrate: "96kbps" },
  { id: "_160", bitrate: "160kbps" },
  { id: "_320", bitrate: "320kbps" }
]
type CurrentScreen = {
  offlineScreenId: string
  playlistScreenId: string
  albumScreenId: string
  songsScreenId: string
  favouriteScreenId: string
  searchScreenId: string
  audioBook: string
}
export const screens: CurrentScreen = {
  offlineScreenId: "offlineSongs",
  playlistScreenId: "playlist",
  albumScreenId: "trendingAblum",
  songsScreenId: "songs",
  favouriteScreenId: "favourites",
  searchScreenId: "search",
  audioBook: "audioBook"
}

export interface DynamicProps {}
interface ArtistScreenDataProps {
  name: string
  id: string
}
export const artists = [{}]
