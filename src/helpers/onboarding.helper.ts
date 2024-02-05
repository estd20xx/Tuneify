import { onBoardingScreen } from "../Types/Types"
class OnboadingHelper {
    onboardHandler = (setnre: (newNre: number) => void, initial: number, navigation: onBoardingScreen) => {
        if (initial == 2) {
            navigation.navigate("bottom")
            setnre(0)
            return
        }
        setnre(initial + 1)
    }
}
const onboardHelper = new OnboadingHelper()
export default onboardHelper