import {View, Text, TouchableOpacity} from "react-native"
import React from "react"
import DocumentPicker from "react-native-document-picker"
import Toast from "react-native-toast-message"
const Artists = () => {
  const chooseFile = async () => {
    try {
      Toast.show({
        type: "success",
        text1: "Hello",
        text2: "This is some something 👋",
      })
    } catch (error) {}
  }
  return (
    <View className="h-screen flex items-center justify-center">
      <Toast />
      <Text className="text-white">Artists</Text>
      <TouchableOpacity
        className="bg-purple-500 px-20 py-5 mt-3 rounded-md"
        onPress={chooseFile}>
        <Text className="text-white font-[300] tracking-wider">Choose</Text>
      </TouchableOpacity>
    </View>
  )
}
export default Artists
