import {Ionboard} from "../Interfaces/onboard.interface"
import {onBoardingScreen} from "../Types/Types"
export default class OnboadringService implements Ionboard {
  constructor(private api: string) {}
  public getOnboardImage = (): string => {
    return this.api
  }
  public onboardHandler = (
    setnre: (newNre: number) => void,
    initial: number,
    navigation: onBoardingScreen
  ) => {
    if (initial == 2) {
      navigation.navigate("bottom")
      setnre(0)
      return
    }
    setnre(initial + 1)
  }
}
