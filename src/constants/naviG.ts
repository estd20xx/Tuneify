import AudioBookDetails from "../components/audioBook/AudioBook.details"
import { ItemTypes } from "../Interfaces/icons.interface"
import { OnBoardingDataTypes } from "../Interfaces/onboard.interface"
import { navigationStrings } from "../NavigationStrings/NavigationStrings"
import { TabItemTypes } from "../Types/Types"
import { Icons } from "./Icon"
import { component } from "./screens"
export const tabBar: TabItemTypes[] = [
  {
    name: "Suggested",
    component: component.Suggested
  },
  {
    name: "Songs",
    component: component.Songs
  },
  {
    name: "Artists",
    component: component.Artists
  },
  {
    name: "Audio Books",
    component: component.Albums
  },
  {
    name: "Folders",
    component: component.Folders
  }
]
export const MainNavigationItems: any[] = [
  {
    name: navigationStrings.splash,
    component: component.Splash
  },
  {
    name: navigationStrings.onboarding,
    component: component.Onboading
  },
  {
    name: navigationStrings.home,
    // Tab
    component: component.Home
  },
  {
    name: navigationStrings.favourites,
    component: component.Favourites
  },
  {
    name: navigationStrings.playlists,
    component: component.Playlists
  },
  {
    name: navigationStrings.settings,
    component: component.Settings
  },
  {
    name: navigationStrings.bottom,
    component: component.BottomNavigation
  },
  {
    name: navigationStrings.TrendingAlbumDetails,
    component: component.TrendingAlbumDetails
  },
  {
    name: navigationStrings.PlaylistDetails,
    component: component.PlaylistDetails
  },
  {
    name: navigationStrings.search,
    component: component.Search
  },
  {
    name: navigationStrings.audioBookDetails,
    component: AudioBookDetails
  }
]
export const onboardingData: OnBoardingDataTypes[] = [
  {
    first: "User friendly mp3",
    second: "music player for",
    third: "your device"
  },
  {
    first: "We provide a better",
    second: "audio experience",
    third: "than others"
  },
  {
    first: "Listen to the best",
    second: "audio & music with",
    third: "Tuneify now!"
  }
]

export const TabItems: ItemTypes[] = [
  {
    name: navigationStrings.home,
    activeSize: 20,
    inactiveSize: 20,
    activeName: "home",
    inactiveName: "home",
    Active: Icons.HomeFocused,
    Inactive: Icons.HomeIcon,
    component: component.Home,
    active: "#ff8214"
  },
  {
    name: navigationStrings.search,
    activeSize: 20,
    inactiveSize: 20,
    activeName: "search",
    inactiveName: "search",
    Active: Icons.SortIcon,
    Inactive: Icons.SortIcon,
    component: component.Search,
    active: "#ff8214"
  },
  {
    name: navigationStrings.favourites,
    activeSize: 20,
    inactiveSize: 20,
    activeName: "heart-fill",
    inactiveName: "heart",
    Active: Icons.HomeIcon,
    Inactive: Icons.HomeIcon,
    component: component.Favourites,
    active: "#ff8214"
  },
  {
    name: navigationStrings.playlists,
    activeSize: 20,
    inactiveSize: 20,
    activeName: "playlist-music",
    inactiveName: "playlist-music-outline",
    Active: Icons.PlayListIcon,
    Inactive: Icons.PlayListIcon,
    component: component.Playlists,
    active: "#ff8214"
  },
  {
    name: navigationStrings.settings,
    activeSize: 20,
    inactiveSize: 20,
    activeName: "settings",
    inactiveName: "settings-outline",
    Active: Icons.SettingsIcon,
    Inactive: Icons.SettingsIcon,
    component: component.Settings,
    active: "#ff8214"
  }
]
