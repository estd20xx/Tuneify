import React, { memo } from "react"
import { TouchableOpacity, View } from "react-native"
import { SharedValue, withSpring } from "react-native-reanimated"
import { Icons } from "../../constants/Icon"

interface Props {
  flipCard: () => void
  togglePlayist: () => void
  minValue: number
  translateY: SharedValue<number>
  Zindex: SharedValue<number>
}

const PlayerHeader: React.FC<Props> = ({
  flipCard,
  togglePlayist,
  translateY,
  minValue,
  Zindex
}) => {
  return (
    <View className="h-10 w-full flex items-center justify-between flex-row">
      <TouchableOpacity
        onPress={() => [
          ((translateY.value = withSpring(minValue)), (Zindex.value = 20))
        ]}
      >
        <Icons.KeyboardDown
          name="keyboard-arrow-down"
          size={35}
          color={"white"}
        />
      </TouchableOpacity>
      <View className="flex flex-row h-full items-center justify-center">
        <TouchableOpacity onPress={() => flipCard()}>
          <Icons.MoreIcon
            name="lyrics"
            size={20}
            color={"white"}
            className="mr-4"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayist}>
          <Icons.MoreIcon name="more-vert" size={25} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default memo(PlayerHeader)
