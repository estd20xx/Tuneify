import Slider from "@react-native-community/slider"
import React, { memo } from "react"
import { Text, View } from "react-native"
import TrackPlayer, { useProgress } from "react-native-track-player"
import { useAccent } from "../../hooks/useAccent"
const PlayerInfo = () => {
  const accent = useAccent()
  const progress = useProgress()
  return (
    <View className="w-full  mt-5 py-2">
      <Slider
        minimumValue={0}
        maximumValue={progress.duration}
        value={progress.position}
        minimumTrackTintColor={accent}
        maximumTrackTintColor="#d0d0d1"
        thumbTintColor={accent}
        onSlidingComplete={(e) => TrackPlayer.seekTo(e)}
      />
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "center"
        }}
      >
        <Text style={{ color: "white", fontFamily: "300" }}>
          {JSON.stringify(Math.floor(progress.position / 60)).padStart(2, "0")}:
          {JSON.stringify(Math.floor(progress.position % 60)).padStart(2, "0")}
        </Text>
        <Text style={{ color: "white", fontFamily: "300" }}>
          {JSON.stringify(Math.floor(progress.duration / 60)).padStart(2, "0")}:
          {JSON.stringify(Math.floor(progress.duration % 60)).padStart(2, "0")}
        </Text>
      </View>
    </View>
  )
}
export default memo(PlayerInfo)
