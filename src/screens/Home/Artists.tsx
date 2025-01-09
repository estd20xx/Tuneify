import React, { memo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import fs from "react-native-fs"
const Artists = () => {
  const chooseFile = async (path?: string) => {
    try {
      const result = await fs.readDir(fs.DownloadDirectoryPath)
      const audioFiles = result.filter(
        (file) =>
          file.isFile() &&
          (file.name.endsWith(".mp3") || file.name.endsWith(".wav") || file.name.endsWith(".flac"))
      )
      audioFiles.map((current) => {
        console.log(current)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="h-screen flex items-center justify-center">
      <Text className="text-white">Artists</Text>
      <TouchableOpacity className="bg-purple-500 px-20 py-5 mt-3 rounded-md">
        <Text className="text-white font-[300] tracking-wider">Choose</Text>
      </TouchableOpacity>
    </View>
  )
}
export default memo(Artists)
