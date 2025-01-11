import { memo } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import tempImage from "../../assets/images/new.png"
import { useAppDispatch } from "../../hooks/store.hook"
const localImage = Image.resolveAssetSource(tempImage).uri

const Artists = () => {
  const dispatch = useAppDispatch()

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
