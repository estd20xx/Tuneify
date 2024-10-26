import React, { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import { albumsApi } from "../../api/api"
import { component } from "../../constants/screens"
import { SeperateAlbumTypes } from "../../Interfaces/album.interface"
import AlbumService from "../../services/album.service"
const service = new AlbumService(albumsApi)
const Albums = () => {
  const [cAlb, setCAlb] = useState<SeperateAlbumTypes[]>([])
  const [isL, setIsL] = useState<boolean>(true)
  useEffect(() => {
    service.getAlbums(setCAlb, setIsL)
  }, [])
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className=" w-full h-auto flex flex-row flex-wrap justify-evenly py-3 pb-20">
        {isL
          ? Array.from({ length: 6 }, (_, index) => {
              return <component.CSeperateSkeleton key={JSON.stringify(index)} />
            })
          : cAlb.map((cA: SeperateAlbumTypes) => {
              return <component.CSeperateAlbum data={cA} key={cA.id} />
            })}
      </View>
    </ScrollView>
  )
}

export default Albums
