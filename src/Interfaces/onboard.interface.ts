import {onBoardingScreen} from '../Types/Types'
export interface Ionboard {
  getOnboardImage: () => string
  onboardHandler: (
    setnre: (newNre: number) => void,
    initial: number,
    navigation: onBoardingScreen,
  ) => void
}
