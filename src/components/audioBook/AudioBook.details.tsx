import React, { memo } from "react"
import { View } from "react-native"
import { audioBookImageBaseUrl } from "../../api/base/constrants"
import { Docs } from "../../screens/Home/Albums"
import Header from "../DetailsScreen/Header"
interface AudioBookData {
  key: string
  name: string
  params: {
    audios: Docs
  }
}
export interface AudioBookDetailsProps {
  route: AudioBookData
}
const AudioBookDetails: React.FC<AudioBookDetailsProps> = ({ route }) => {
  const { audios } = route.params
  return (
    <View>
      <Header
        title={audios.title}
        artwork={audioBookImageBaseUrl.concat(audios.identifier)}
        type={"Audio Book"}
        desc={audios.description}
      />
    </View>
  )
}
export default memo(AudioBookDetails)
