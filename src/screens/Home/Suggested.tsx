import { View, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import {
  AlbumTypes,
  ChartsTypes,
  PlaylistTypes,
  TrendingAlbumTypes,
  TrendingSongTypes,
} from '../../Types/Types'
import { component } from "../../constants/screens"
import SuggestedServices from '../../services/suggested.service'
const service = new SuggestedServices()
const Suggested = () => {
  const [albums, setAlbums] = useState<AlbumTypes[]>([])
  const [plst, setPlst] = useState<PlaylistTypes[]>([])
  const [chst, setChst] = useState<ChartsTypes[]>([])
  const [trndSong, setTrndSong] = useState<TrendingSongTypes[]>([])
  const [trndAlb, setTrndAlb] = useState<TrendingAlbumTypes[]>([])
  const [ld, setLd] = useState<boolean>(true)
  const [ref, setRef] = useState(false)
  const onRefresh = useCallback(async () => {
    setRef(true)
    service.getSuggestedData(setAlbums, setPlst, setChst, setLd, setTrndSong, setTrndAlb)
    await service.wait(2000).then(() => setRef(false))
  }, [])
  useEffect(() => {
    service.getSuggestedData(setAlbums, setPlst, setChst, setLd, setTrndSong, setTrndAlb)
  }, [])
  return (
    <ScrollView showsVerticalScrollIndicator={false} refreshControl={
      <RefreshControl refreshing={ref} onRefresh={onRefresh} />
    }>
      <View className='bg-[#181a20] w-full h-auto pb-10'>
        {ld ?
          <View>
            <component.CSuggestedSkeleton />
            <component.CSuggestedSkeleton />
            <component.CSuggestedSkeleton />
            <component.CSuggestedSkeleton />
          </View> :
          <>
            <component.CTrendingAlbum data={trndAlb} topic={"Trending Albums"} />
            <component.CPlaylist data={plst} topic={"Playlists"} />
            <component.CAlbums data={albums} topic={"Albums"} />
            <component.CCharts data={chst} topic={"Top Flavour"} />
            {trndSong.length > 0 && <component.CTrendingSong data={trndSong} topic='Trending Song' />}
          </>
        }
      </View>
    </ScrollView>
  )
}
export default Suggested