import Slider from "@react-native-community/slider"
import React from "react"
import { Text, View } from "react-native"
import TrackPlayer, { Progress } from "react-native-track-player"
const PlayerInfo = ({ progress }: Readonly<{ progress: Progress }>) => {
  return (
    <View className="w-full  mt-5 py-2">
      <Slider
        minimumValue={0}
        maximumValue={progress.duration}
        value={progress.position}
        minimumTrackTintColor="#ff8216"
        maximumTrackTintColor="#d0d0d1"
        thumbTintColor="#ff8216"
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
          {JSON.stringify(Math.floor(progress.duration / 60)).padStart(2, "0")}
        </Text>
      </View>
    </View>
  )
}
export default PlayerInfo
