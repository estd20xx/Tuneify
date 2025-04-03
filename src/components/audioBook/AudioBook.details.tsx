import React, { memo, useEffect } from "react"
import { View } from "react-native"
import { audioBookImageBaseUrl } from "../../api/base/constrants"
import { useAppDispatch } from "../../hooks/store.hook"
import { Docs } from "../../screens/Home/Albums"
import { audioBookDetails } from "../../store/actions/audioBookDetails.action"
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
  const dispatch = useAppDispatch()

  const get = async () => {
    try {
      dispatch(
        audioBookDetails.getAudioBookDetails({ identifier: audios.identifier })
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get()
  }, [])
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
