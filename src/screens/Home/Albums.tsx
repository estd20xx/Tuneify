import { View, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SeperateAlbumTypes } from '../../Types/Types'
import AlbumService from '../../services/album.service'
import { albumsApi } from '../../api/api'
import { component } from '../../constants/screens';
const service = new AlbumService(albumsApi)
const Albums = () => {
  const [cAlb, setCAlb] = useState<SeperateAlbumTypes[]>([])
  const [isL, setIsL] = useState<boolean>(true)
  useEffect(() => {
    service.getAlbums(setCAlb, setIsL)
  }, [])
  return (
    <ScrollView>
      <View className='bg-[#181a20] w-full h-auto flex flex-row flex-wrap justify-evenly py-3'>
        {isL ?
          Array.from({ length: 6 }, (_, index) => {
            return (
              <component.CSeperateSkeleton key={index} />
            )
          })
          :
          cAlb.map((cA: SeperateAlbumTypes) => {
            return (
              <component.CSeperateAlbum data={cA} key={cA.id} />
            )
          })
        }
      </View>
    </ScrollView>
  )
}

export default Albums