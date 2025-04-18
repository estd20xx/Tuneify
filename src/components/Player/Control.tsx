import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { Shuffle } from "lucide-react-native"
import React, { memo } from "react"
import { TouchableOpacity, View } from "react-native"
import { FAB } from "react-native-paper"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"
import { PlaybackState, State } from "react-native-track-player"
import { Icons } from "../../constants/Icon"
import { useSongChange } from "../../hooks/useSongChange"
import { applicationService } from "../../services/Tuneify.service"
import { InitialCentralQueue } from "../../store/slices/Queue.slice"

const AnimatedFab = Animated.createAnimatedComponent(FAB)
interface ControlersProps {
  isRepeat: boolean
  playbackState:
    | PlaybackState
    | {
        state: undefined
      }
  applicationQueue: InitialCentralQueue
  dispatch: Dispatch<UnknownAction>
  isShuffle: boolean
  toggleShuffle: () => void
}
const Control: React.FC<ControlersProps> = ({
  isRepeat,
  playbackState,
  applicationQueue,
  dispatch,
  isShuffle,
  toggleShuffle
}) => {
  const [previous, next] = useSongChange(isShuffle)
  const borderRadius = useSharedValue(50)

  const animatedBorder = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(borderRadius.value, { duration: 200 })
    }
  })

  return (
    <View className="h-18  w-full flex items-center justify-evenly flex-row mt-3">
      <View className="h-full flex items-center flex-row justify-around pl-2 w-[20%]">
        <TouchableOpacity onPress={toggleShuffle}>
          <Shuffle
            size={24}
            className={`${isShuffle ? "text-[#ff8216]" : "text-[#bababa]"}`}
          />
        </TouchableOpacity>
      </View>
      <View className="h-full w-[60%] flex items-center justify-evenly flex-row">
        <TouchableOpacity onPress={() => previous()}>
          <Icons.KeyboardDown name="skip-previous" color={"white"} size={35} />
        </TouchableOpacity>
        <AnimatedFab
          icon={playbackState.state == State.Playing ? "pause" : "play"}
          onPress={() => {
            borderRadius.value = borderRadius.value === 50 ? 15 : 50
            applicationService.playPauseAction(
              playbackState,
              applicationQueue,
              dispatch
            )
          }}
          loading={playbackState.state === (State.Loading || State.Buffering)}
          className={"bg-themeOrange"}
          style={animatedBorder}
        />
        <TouchableOpacity onPress={() => next()}>
          <Icons.KeyboardDown name="skip-next" color={"white"} size={35} />
        </TouchableOpacity>
      </View>
      <View className="flex items-center flex-row justify-around pr-2 h-full w-[20%]">
        <TouchableOpacity
          onPress={() =>
            applicationService.repeatMode(applicationQueue, dispatch)
          }
        >
          <Icons.PlayListIcon
            name={isRepeat ? "repeat" : "repeat-off"}
            color={isRepeat ? "#ff8216" : "#bababa"}
            size={28}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default memo(Control)
