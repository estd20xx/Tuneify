import { onBoardingScreen } from "../Types/Types"
export interface OnBoardingDataTypes {
  first: string
  second: string
  third: string
}
export interface OnBoardingPropsTypes {
  navigation: onBoardingScreen
}
export interface OnboardingInterface {
  getOnboardImage: () => string
  onboardHandler: (
    setnre: (newNre: number) => void,
    initial: number,
    navigation: onBoardingScreen
  ) => void
}
