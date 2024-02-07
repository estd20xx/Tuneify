import Home from "../screens/Home";
import Albums from "../screens/Home/Albums";
import Artists from "../screens/Home/Artists";
import Folders from "../screens/Home/Folders";
import Songs from "../screens/Home/Songs";
import Suggested from "../screens/Home/Suggested";
import Playlists from '../screens/Playlists';
import Settings from "../screens/Settings";
import Favourites from "../screens/Favourites";
import Splash from "../screens/Splash";
import HomePage from "../screens/HomePage";
import BottomNavigation from "../mainNavigation/Bottom";
import Onboading from "../screens/onboading/Onboading";
import EntryPoint from "../screens/EntryPoint";
import CPlaylist from "../components/Playlist"
import CCharts from '../components/Charts'
import CTrendingSong from '../components/TrendingSong'
import CTrendingAlbum from '../components/TrendingAlbum'
import CAlbums from '../components/Albums'
import CSuggestedSkeleton from '../components/skeleton/SuggestedSkeleton'
import TabButton from '../components/TabButton';
import CHeader from '../components/Header';
import CSeperateAlbum from '../components/SeperateAlbum'
import CSeperateSkeleton from '../components/skeleton/SeperateAlbumSkeleton';
export const component = {
    Home, Albums, Artists, Folders, Songs, Suggested, Playlists, CAlbums, TabButton,
    Settings, Favourites, CPlaylist, CCharts, CTrendingAlbum, CTrendingSong,
    Splash, HomePage, BottomNavigation, Onboading, EntryPoint, CSuggestedSkeleton,
    CHeader, CSeperateAlbum, CSeperateSkeleton
}