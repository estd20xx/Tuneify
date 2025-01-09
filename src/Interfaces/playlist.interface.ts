import { PlaylistResponse } from "../api/interface/module.interface"
import { ImageType } from "../Types/Types"
export interface PlaylistTypesDetails {
  id: string
  userId: string
  name: string
  title: string
  subtitle: string
  type: string
  image: ImageType[]
  url: string
  songCount: string
  firstname: string
  followerCount: string
  lastUpdated: string
  explicitContent: string
}
export interface PlaylistDataProps {
  data: PlaylistResponse[]
  topic: string
}
