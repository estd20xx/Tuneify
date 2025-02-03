import React, { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Checkbox } from "react-native-paper"
const SearchSwitch = () => {
  const [yes, setYes] = useState<boolean>(false)
  const [isHindi, setIsHindi] = useState<boolean>(true)
  return (
    <View className="w-full h-10 flex flex-row justify-between px-2">
      <TouchableOpacity
        onPress={() => setIsHindi(true)}
        className="flex items-center justify-center flex-row h-full"
      >
        <Text className={`${isHindi && "text-white"} text-xl`}>Hindi</Text>
        <Checkbox
          disabled={!isHindi}
          status={isHindi ? "checked" : "unchecked"}
          onPress={() => setIsHindi(true)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsHindi(false)}
        className="flex items-center justify-center flex-row h-full"
      >
        <Text className={` ${!isHindi && "text-white"} text-xl`}>
          universal
        </Text>
        <Checkbox
          disabled={isHindi}
          status={isHindi ? "unchecked" : "checked"}
          onPress={() => setIsHindi(false)}
        />
      </TouchableOpacity>
    </View>
  )
}
export default SearchSwitch
