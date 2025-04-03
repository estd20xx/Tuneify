import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { audioBookImageBaseUrl } from "../../api/base/constrants"
import { AudioBookScreenInterface } from "../../screens/Home/AudioBook"
import { RootStackParamList } from "../../Types/Types"
const HorizonTalList: React.FC<AudioBookScreenInterface> = ({
  title,
  audios
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <>
      <Text className="text-white font-['500'] text-xl p-3">{title}</Text>
      <FlatList
        data={audios}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        keyExtractor={(item) => item.identifier}
        initialNumToRender={3}
        horizontal
        renderItem={(items) => {
          const { item } = items
          return (
            <TouchableOpacity
              key={item.identifier}
              className="h-48 w-36  ml-3 rounded-2xl overflow-hidden"
              onPress={() => {
                navigation.navigate("audioBookDetails", { audios: item })
              }}
            >
              <View className="w-full h-4/6">
                <FastImage
                  source={{
                    uri: audioBookImageBaseUrl.concat(item.identifier),
                    priority: FastImage.priority.high
                  }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </View>
              <View className="p-2">
                <Text className="text-white text-xs">
                  {item.title.length > 18
                    ? item.title.slice(0, 18) + "..."
                    : item.title}
                </Text>
                <Text className="text-xs">{item.creator}</Text>
                <Text>{item.language}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </>
  )
}

export default HorizonTalList
