import HomeIcon from "react-native-vector-icons/Octicons"
import HomeFocused from "react-native-vector-icons/Foundation"
import PlayListIcon from "react-native-vector-icons/MaterialCommunityIcons"
import SettingsIcon from "react-native-vector-icons/Ionicons"
import { navigationStrings } from '../NavigationStrings/NavigationStrings';
import Home from '../screens/Home';
import Favourites from '../screens/Favourites';
import Playlists from '../screens/Playlists';
import Settings from '../screens/Settings';
import { ItemTypes } from "../Types/Types";
export const Icons = {
    HomeIcon,
    HomeFocused,
    PlayListIcon,
    SettingsIcon
}

export const TabArr: ItemTypes[] = [
    {
        name: navigationStrings.home,
        activeSize: 25,
        inactiveSize: 20,
        activeName: "home",
        inactiveName: "home",
        Active: HomeFocused,
        Inactive: HomeIcon,
        component: Home,
        active: "#ff8214",
    },
    {
        name: navigationStrings.favourites,
        activeSize: 20,
        inactiveSize: 20,
        activeName: "heart-fill",
        inactiveName: "heart",
        Active: HomeIcon,
        Inactive: HomeIcon,
        component: Favourites,
        active: "#ff8214",
    },
    {
        name: navigationStrings.playlists,
        activeSize: 20,
        inactiveSize: 20,
        activeName: "playlist-music",
        inactiveName: "playlist-music-outline",
        Active: PlayListIcon,
        Inactive: PlayListIcon,
        component: Playlists,
        active: "#ff8214",
    },
    {
        name: navigationStrings.settings,
        activeSize: 20,
        inactiveSize: 20,
        activeName: "settings",
        inactiveName: "settings-outline",
        Active: SettingsIcon,
        Inactive: SettingsIcon,
        component: Settings,
        active: "#ff8214",
    },
];