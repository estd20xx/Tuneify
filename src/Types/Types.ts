import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { MemoExoticComponent } from "react"
import {
  AlbumResponse,
  ChartsResponse,
  PlaylistResponse
} from "../api/interface/module.interface"
import { Docs } from "../screens/Home/AudioBook"
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
  audioBookDetails: string
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
  TrendingAlbumDetails: { albumData: AlbumResponse }
  PlaylistDetails: { playlistData: PlaylistResponse }
  albumsDetails: undefined
  trendingSongDetails: undefined
  charts: undefined
  search: undefined
  audioBookDetails: { audios: Docs }
}

export type HomeScreen = NativeStackNavigationProp<RootStackParamList, "home">
export interface HomeScreenProps {
  navigation: HomeScreen
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

export interface ChartsPropsTypes {
  data: ChartsResponse[]
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
  component: MemoExoticComponent<() => React.JSX.Element>
}
