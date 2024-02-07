import { navigationStrings } from "../NavigationStrings/NavigationStrings";
import { OnBoardingDataTypes, TabItemTypes } from "../Types/Types";
import { screens } from "./screens";
export const tabBar: TabItemTypes[] = [
    {
        name: "Suggested",
        component: screens.Suggested
    },
    {
        name: "Songs",
        component: screens.Songs
    },
    {
        name: "Artists",
        component: screens.Artists
    },
    {
        name: "Albums",
        component: screens.Albums
    },
    {
        name: "Folders",
        component: screens.Folders
    },
]

export const MainNavigationItems: any[] = [
    {
        name: navigationStrings.splash,
        component: screens.Splash
    },
    {
        name: navigationStrings.onboarding,
        component: screens.Onboading
    },
    {
        name: navigationStrings.homePage,
        component: screens.HomePage
    },
    {
        name: navigationStrings.home,
        component: screens.Home
    },
    {
        name: navigationStrings.favourites,
        component: screens.Favourites
    },
    {
        name: navigationStrings.playlists,
        component: screens.Playlists
    },
    {
        name: navigationStrings.settings,
        component: screens.Settings
    },
    {
        name: navigationStrings.bottom,
        component: screens.BottomNavigation
    },
    {
        name: navigationStrings.enrtyPoint,
        component: screens.EntryPoint
    },
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
        third: "Musify now!"
    },
]
