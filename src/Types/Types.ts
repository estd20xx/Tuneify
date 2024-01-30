import { NativeStackNavigationProp } from '@react-navigation/native-stack';
export interface NavigationStringsTypes {
    splash: string
    onboarding: string
    homePage: string
    favourites: string
    playlists: string
    settings: string
    home: string
    bottom: string
}

type RootStackParamList = {
    splash: undefined
    onboarding: undefined
    homePage: undefined
    favourites: undefined
    playlists: undefined
    settings: undefined
    home: undefined
    bottom: undefined
};
export type splashScreen = NativeStackNavigationProp<RootStackParamList, "splash">;
export interface SplashScreenPropsTypes {
    navigation: splashScreen;
}

// ===== Album types
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
export interface AlbumTypes extends PrimaryArtistsTypes, ArtistsTypes, ImageType {
    id: string
    name: string
    year: string
    type: string
    playCount: string
    language: string
    explicitContent: string
    url: string
    primaryArtists: PrimaryArtistsTypes[]
    featuredArtists: []
    artists: ArtistsTypes[]
    image: ImageType[]
    songs: []
}
export interface AlbumDataProps {
    data: AlbumTypes[]
    topic: string
}

// ====PlayLists Types


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
export interface PlaylistDataProps {
    data: PlaylistTypes[]
    topic: string
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

export interface TrendingSongTypes {
    id: string
    name: string
    type: string
    album: SmallAlbumTypes
    url: string,
    year: string
    releaseDate: string,
    duration: string,
    label: string
    primaryArtists: PrimaryArtistsTypes[]
    featuredArtists: []
    explicitContent: string
    language: string
    image: ImageType[]
}

export interface TrendingSongsPropsTypes {
    data: TrendingSongTypes[]
    topic: string
}
export interface TrendingAlbumTypes {
    id: string
    name: string
    type: string
    year: string
    releaseDate: string
    playCount: string
    language: string
    explicitContent: string
    songCount: string
    url: string
    primaryArtists: PrimaryArtistsTypes[]
    featuredArtists: []
    artists: ArtistsTypes[]
    image: ImageType[]
}
export interface TrendingAlbumPropsTypes {
    data: TrendingAlbumTypes[]
    topic: string
}

export interface DownliadUrlType {
    quality: string
    link: string
}

export interface SongsTypes {
    id: string,
    name: string
    type: string
    album: {
        id: string
        name: string
        url: string
    }
    year: string
    releaseData: string
    duration: string
    label: string
    primaryArtists: string
    featuredArtists: string
    explicitContent: string
    playCount: string
    language: string
    hashLyrics: string
    url: string
    copyright: string
    image: ImageType[]
    downloadUrl: DownliadUrlType[]
}