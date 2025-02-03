import React, { memo } from "react"
import { TouchableOpacity, View } from "react-native"
import { Icons } from "../../constants/Icon"

interface Props {
  togglePlayer: () => void
  flipCard: () => void
  togglePlayist: () => void
}

const PlayerHeader: React.FC<Props> = ({
  togglePlayer,
  flipCard,
  togglePlayist
}) => {
  return (
    <View className="h-10 w-full flex items-center justify-between flex-row">
      <TouchableOpacity onPress={togglePlayer}>
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
