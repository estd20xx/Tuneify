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