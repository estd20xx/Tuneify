import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import React from "react"
import {TrendingAlbumTypes} from "../Interfaces/album.interface"
import {PlaylistTypes} from "../Interfaces/playlist.interface"
export interface NavigationStringsTypes {
  splash: string
  onboarding: string
  homePage: string
  favourites: string
  playlists: string
  settings: string
  home: string
  bottom: string
  TrendingAlbumDetails: string
  PlaylistDetails: string
  albumsDetails: string
  trendingSongDetails: string
  charts: string
  search: string
}
export type RootStackParamList = {
  splash: undefined
  onboarding: undefined
  homePage: undefined
  favourites: undefined
  playlists: undefined
  settings: undefined
  home: undefined
  bottom: undefined
  TrendingAlbumDetails: {albumData: TrendingAlbumTypes}
  PlaylistDetails: {playlistData: PlaylistTypes}
  albumsDetails: undefined
  trendingSongDetails: undefined
  charts: undefined
  search: undefined
}
export type splashScreen = NativeStackNavigationProp<
  RootStackParamList,
  "splash"
>
export type onBoardingScreen = NativeStackNavigationProp<
  RootStackParamList,
  "onboarding"
>
export interface SplashScreenPropsTypes {
  navigation: splashScreen
}
export interface ImageType {
  quality: string
  link: string
}
export interface PrimaryArtistsTypes extends ImageType {
  id: string
  name: string
  url: string
  image: ImageType[]
  type: string
  role: string
}
export interface ArtistsTypes extends ImageType {
  id: string
  name: string
  url: string
  image: ImageType[]
  type: string
  role: string
}

export interface ChartsTypes {
  id: string
  title: string
  subtitle: string
  type: string
  image: ImageType[]
  url: string
  firstname: string
  lastUpdated: string
  language: string
}

export interface ChartsPropsTypes {
  data: ChartsTypes[]
  topic: string
}
export interface SmallAlbumTypes {
  id: string
  name: string
}

export interface DownloadUrlType {
  quality: string
  link: string
}

export interface CustomPArt {
  id: string
  name: string
  url: string
  image: boolean
  type: string
  role: string
}

export interface MinNItemTypes {
  name: string
  component: () => React.JSX.Element
}
export interface TabItemTypes {
  name: string
  component: () => React.JSX.Element
}
