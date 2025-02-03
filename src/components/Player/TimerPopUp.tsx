import Slider from "@react-native-community/slider"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import React, { memo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { applicationService } from "../../services/Tuneify.service"
import Show from "../Common/Show"

interface PopUpInterface {
  isModal: boolean
  value: number
  setValue: (value: number) => void
  toggleTimer: () => void
  toggleModal: () => void
  dispatch: Dispatch<UnknownAction>
}

const TimerPopUp: React.FC<PopUpInterface> = ({
  isModal,
  value,
  setValue,
  toggleTimer,
  toggleModal,
  dispatch
}) => {
  return (
    <Show isVisible={isModal}>
      <View className="h-48  w-4/5 bg-black absolute z-50 m-auto left-12 rounded-3xl flex items-center justify-center">
        <Slider
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={60}
          value={value}
          minimumTrackTintColor="#181a20"
          maximumTrackTintColor="white"
          thumbTintColor="#181a20"
          onSlidingComplete={(e) => setValue(Math.floor(e))}
        />
        <Text className="text-white text-xl mt-3 font-['500']">{value}</Text>
        <TouchableOpacity
          className="mt-8 bg-green-400 px-16 py-3 rounded-md"
          onPress={() => [
            toggleTimer(),
            applicationService.timerMusicOff(value, dispatch, toggleTimer),
            toggleModal()
          ]}
        >
          <Text className="text-white text-lg font-['400']">Set</Text>
        </TouchableOpacity>
      </View>
    </Show>
  )
}

export default memo(TimerPopUp)
