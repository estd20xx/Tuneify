import { Shuffle } from "lucide-react-native"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Icons } from "../../constants/Icon"
interface Props {
  shuffleHandler: () => void
  simplePlayHandler: () => void
  total: number
}
const FavouriteHeader: React.FC<Props> = ({
  shuffleHandler,
  simplePlayHandler,
  total
}) => {
  return (
    <React.Fragment>
      <View className="w-full h-20  flex flex-row items-center justify-evenly">
        <TouchableOpacity
          className="bg-themeOrange h-8 px-10 rounded-full flex items-center justify-center flex-row"
          onPress={shuffleHandler}
        >
          <Shuffle size={15} color={"#fff"} className="mr-1" />
          <Text className="text-white text-base font-[400]">Suffle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#35383f] h-8 px-10 rounded-full flex items-center justify-center flex-row"
          onPress={simplePlayHandler}
        >
          <Icons.PlayIcon
            name="play"
            color={"white"}
            size={20}
            className="mr-1"
          />
          <Text className="text-white text-base font-[400]">Play</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-white text-2xl font-['400'] ml-5 border-b-[1px] border-gray-500">
        {total} Favourites
      </Text>
    </React.Fragment>
  )
}

export default FavouriteHeader
