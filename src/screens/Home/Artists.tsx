import React, { memo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import DocumentPicker from "react-native-document-picker"
const Artists = () => {
  const chooseFile = async () => {
    try {
      const data = await DocumentPicker.pickSingle()
      console.log(data)
    } catch (error) { }
  }
  return (
    <View className="h-screen flex items-center justify-center">
      <Text className="text-white">Artists</Text>
      <TouchableOpacity className="bg-purple-500 px-20 py-5 mt-3 rounded-md" onPress={chooseFile}>
        <Text className="text-white font-[300] tracking-wider">Choose</Text>
      </TouchableOpacity>
    </View>
  )
}
export default memo(Artists)
