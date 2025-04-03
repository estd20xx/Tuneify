import CSeperateAlbum from "../components/SeperateAlbum"
import CSeperateSkeleton from "../components/skeleton/SeperateAlbumSkeleton"
import CSuggestedSkeleton from "../components/skeleton/SuggestedSkeleton"
import CAlbums from "../components/Suggested/Albums"
import CCharts from "../components/Suggested/Charts"
import CPlaylist from "../components/Suggested/Playlist"
import PlaylistDetails from "../components/Suggested/Playlist.details"
import CTrendingAlbum from "../components/Suggested/TrendingAlbum"
import TrendingAlbumDetails from "../components/Suggested/TrendingAlbum.details"
import CTrendingSong from "../components/TrendingSong"
import BottomNavigation from "../mainNavigation/Bottom"
import Favourites from "../screens/Favourites"
import Home from "../screens/Home"
import Artists from "../screens/Home/Artists"
import Albums from "../screens/Home/AudioBook"
import Folders from "../screens/Home/Folders"
import Songs from "../screens/Home/Songs"
import Suggested from "../screens/Home/Suggested"
import Onboading from "../screens/onboading/Onboading"
import Playlists from "../screens/playlist/Playlists"
import Search from "../screens/Search"
import Settings from "../screens/Settings/Settings"
import Splash from "../screens/Splash"
export const component = {
  Home,
  Albums,
  Artists,
  Folders,
  Songs,
  Suggested,
  Playlists,
  CAlbums,
  Settings,
  Favourites,
  CPlaylist,
  CCharts,
  CTrendingAlbum,
  CTrendingSong,
  Splash,
  BottomNavigation,
  Onboading,
  CSuggestedSkeleton,
  CSeperateAlbum,
  CSeperateSkeleton,
  TrendingAlbumDetails,
  PlaylistDetails,
  Search
}
