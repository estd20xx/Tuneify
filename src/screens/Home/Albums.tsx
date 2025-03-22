import React, { memo, useEffect } from "react"
import { ScrollView } from "react-native"
import HorizonTalList from "../../components/audioBook/HorizonTalList"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { getAudioBooks } from "../../store/actions/audioBook.action"
import { audioBooks } from "../../store/slices/audioBook.slice"

export type Docs = {
  avg_rating: number
  creator: string
  date: string
  description: string
  downloads: number
  identifier: string
  item_size: number
  language: string
  num_reviews: number
  runtime: string
  subject: Array<string>
  title: string
}

export interface AudioBookScreenInterface {
  title: string
  audios: Array<Docs>
}

const Albums = () => {
  const audioData = TypedSelectorHook(audioBooks)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAudioBooks())
  }, [])
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ paddingBottom: 200 }}
    >
      {audioData.data?.map((current) => (
        <HorizonTalList key={current.title} {...current} />
      ))}
    </ScrollView>
  )
}
export default memo(Albums)
