import { View, Text, ScrollView, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import homeHelper from '../../helpers/suggestedHelper'
import { SeperateAlbumTypes } from '../../Types/Types'
import SeperateAlbum from '../../components/SeperateAlbum'
import SeperateSkeleton from '../../components/skeleton/SeperateAlbumSkeleton';

const Albums = () => {
  const [cAlb, setCAlb] = useState<SeperateAlbumTypes[]>([])
  const [isL, setIsL] = useState<boolean>(true)
  const ablumDatFetcher = async () => {
    try {
      const data = await homeHelper.getData("https://saavn.me/search/albums?query=rockstar")
      setCAlb(data.data.results)
      setIsL(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    ablumDatFetcher()
  }, [])
  return (
    <ScrollView>
      <View className='bg-[#181a20] w-full h-auto flex flex-row flex-wrap justify-evenly py-3'>
        {isL ?

          Array.from({ length: 6 }, (_, index) => {
            return (
              <SeperateSkeleton key={index} />
            )
          })
          :
          cAlb.map((cA: SeperateAlbumTypes) => {
            return (
              <SeperateAlbum data={cA} key={cA.id} />
            )
          })
        }
      </View>
    </ScrollView>
  )
}

export default Albums