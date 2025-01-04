import React, { memo, useEffect, useState } from "react"
import { ScrollView } from "react-native"
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
  return <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
}

export default memo(Albums)
