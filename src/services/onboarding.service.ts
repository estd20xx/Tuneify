import { OnboardingInterface } from "../Interfaces/onboard.interface"
import { onBoardingScreen } from "../Types/Types"
export default class OnboadringService implements OnboardingInterface {
  constructor(private api: string) {}
  public getOnboardImage = (): string => {
    return this.api
  }
  public onboardHandler = (
    updateOnIndex: (newNre: number) => void,
    initial: number,
    navigation: onBoardingScreen
  ) => {
    if (initial == 2) {
      navigation.navigate("bottom")
      updateOnIndex(0)
      return
    }
    updateOnIndex(initial + 1)
  }
}
