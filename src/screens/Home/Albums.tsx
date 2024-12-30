import React, { memo, useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { Text } from "react-native-paper"
import { albumsApi } from "../../api/api"
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
      <Text>-</Text>
    </ScrollView>
  )
}

export default memo(Albums)
