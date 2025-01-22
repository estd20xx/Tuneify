import React, { memo } from "react"
import { View } from "react-native"
import TextTicker from "react-native-text-ticker"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
interface SongInfoInterface {
  currentTrack: StoreSongTypes | undefined
}
const SongInfo: React.FC<SongInfoInterface> = ({ currentTrack }) => {
  return (
    <View className="w-full mt-5 flex items-center justify-center h-auto">
      <TextTicker
        duration={20000}
        loop
        repeatSpacer={50}
        marqueeDelay={3000}
        animationType="scroll"
        className="text-gray-300 text-xl  font-['600'] mb-1"
      >
        {currentTrack?.title}
      </TextTicker>
      <TextTicker
        style={{ fontSize: 15, color: "#bdbdbd" }}
        className="font-['300']"
        duration={10000}
        loop
        bounce
        repeatSpacer={50}
        marqueeDelay={1000}
      >
        {currentTrack?.artist}
      </TextTicker>
    </View>
  )
}

export default memo(SongInfo)
