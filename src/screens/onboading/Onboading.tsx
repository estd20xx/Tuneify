import React, { memo, useEffect } from "react"
import { Platform, StatusBar, Text, TouchableOpacity, View } from "react-native"
import * as Animatable from "react-native-animatable"
import { onBoardImageApi } from "../../api/base/constrants"
import { onboardingData } from "../../constants/navigation"
import { useOnboarding } from "../../hooks/useOnboarding"
import { OnBoardingPropsTypes } from "../../Interfaces/onboard.interface"
import OnboadringService from "../../services/onboarding.service"
const service = new OnboadringService(onBoardImageApi)
const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity)
const Onboading: React.FC<OnBoardingPropsTypes> = ({ navigation }) => {
  const [data, updateData, onIndex, updateOnIndex] = useOnboarding()

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#e28f22")
    }
  }, [])
  return (
    <View className="w-full h-screen">
      <View className="w-full h-[80%] overflow-hidden">
        <Animatable.Image
          animation="zoomInUp"
          source={{ uri: service.getOnboardImage() }}
          className="w-full h-full"
        />
      </View>
      <View className="w-full h-[45%] bg-[#181a20] absolute bottom-0 rounded-t-[50px] pt-10 flex items-center">
        {onboardingData.map((c, index) => {
          return (
            <View key={c.first}>
              {onIndex == index && (
                <View className="w-full  h-auto py-2 flex items-center justify-center mt-3 ">
                  {Object.values(c).map((selected, i) => {
                    return (
                      <Animatable.Text
                        key={selected}
                        animation={"slideInLeft"}
                        duration={1000 * i}
                        className="text-white text-4xl tracking-widest  font-[500]"
                      >
                        {selected}
                      </Animatable.Text>
                    )
                  })}
                </View>
              )}
            </View>
          )
        })}
        <View className="w-1/2 h-5  mt-5 flex flex-row items-center justify-center">
          {onboardingData.map((current, index) => {
            return (
              <View
                key={current.first}
                className={`${
                  onIndex == index ? "w-14" : "w-5"
                } h-2 rounded-full duration-1000  bg-themeOrange ml-1`}
              />
            )
          })}
        </View>
        <AnimatedButton
          animation={"slideInUp"}
          className="bg-themeOrange absolute bottom-12 w-11/12 flex items-center justify-center py-3 rounded-3xl"
          onPress={() =>
            service.onboardHandler(updateOnIndex, onIndex, navigation)
          }
        >
          <Text className="text-white text-xl font-[400]">Next</Text>
        </AnimatedButton>
      </View>
    </View>
  )
}
export default memo(Onboading)
