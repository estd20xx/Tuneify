import { navigationStrings } from "../NavigationStrings/NavigationStrings";
import Favourites from "../screens/Favourites";
import Home from "../screens/Home";
import Albums from "../screens/Home/Albums";
import Artists from "../screens/Home/Artists";
import Folders from "../screens/Home/Folders";
import Songs from "../screens/Home/Songs";
import Suggested from "../screens/Home/Suggested";
import Playlists from "../screens/Playlists";
import Settings from "../screens/Settings";
import HomeIcon from "react-native-vector-icons/Octicons"
import HomeFocused from "react-native-vector-icons/Foundation"
import PlayListIcon from "react-native-vector-icons/MaterialCommunityIcons"
import SettingsIcon from "react-native-vector-icons/Ionicons"
export const tabBar = [
    {
        name: "Suggested",
        component: Suggested
    },
    {
        name: "Songs",
        component: Songs
    },
    {
        name: "Artists",
        component: Artists
    },
    {
        name: "Albums",
        component: Albums
    },
    {
        name: "Folders",
        component: Folders
    },
]
export const bottomTab = [
    {
        name: navigationStrings.home,
        component: Home,
        activeSize: 25,
        inactiveSize: 20,
        activeName: "home",
        inactiveName: "home",
        Active: HomeFocused,
        Inactive: HomeIcon
    },
    {
        name: navigationStrings.favourites,
        component: Favourites,
        activeSize: 20,
        inactiveSize: 20,
        activeName: "heart-fill",
        inactiveName: "heart",
        Active: HomeIcon,
        Inactive: HomeIcon
    },
    {
        name: navigationStrings.playlists,
        component: Playlists,
        activeSize: 20,
        inactiveSize: 20,
        activeName: "playlist-music",
        inactiveName: "playlist-music-outline",
        Active: PlayListIcon,
        Inactive: PlayListIcon
    },
    {
        name: navigationStrings.settings,
        component: Settings,
        activeSize: 20,
        inactiveSize: 20,
        activeName: "settings",
        inactiveName: "settings-outline",
        Active: SettingsIcon,
        Inactive: SettingsIcon
    },
]