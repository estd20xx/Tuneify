import {ImageType} from "../Types/Types"

export interface PlaylistTypes {
  id: string
  userId: string
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
  data: PlaylistTypes[]
  topic: string
}
