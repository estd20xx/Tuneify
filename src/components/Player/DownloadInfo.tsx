import React from "react"
import { Text, View } from "react-native"
import Show from "../Common/Show"
const DownloadInfo = ({ progress }: Readonly<{ progress: number }>) => {
  return (
    <Show isVisible={progress > 0}>
      <View className="w-full h-screen absolute bg-black z-50 opacity-80 flex items-center justify-center">
        <Text className="text-3xl">Downloading...</Text>
        <Text className="text-2xl text-white">{progress} %</Text>
      </View>
    </Show>
  )
}
export default React.memo(DownloadInfo)
