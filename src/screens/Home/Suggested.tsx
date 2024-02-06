import { View, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import {
  AlbumTypes,
  ChartsTypes,
  PlaylistTypes,
  TrendingAlbumTypes,
  TrendingSongTypes,
} from '../../Types/Types'
import Albums from '../../components/Albums'
import Playlist from '../../components/Playlist'
import Charts from '../../components/Charts'
import TrendingSong from '../../components/TrendingSong'
import TrendingAlbum from '../../components/TrendingAlbum'
import SuggestedSkeleton from '../../components/skeleton/SuggestedSkeleton'
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
    service.getSuggestedData(setAlbums,setPlst, setChst,setLd,setTrndSong,setTrndAlb)
    await service.wait(2000).then(() => setRef(false))
  }, [])
  useEffect(() => {
    service.getSuggestedData(setAlbums,setPlst, setChst,setLd,setTrndSong,setTrndAlb)
  }, [])
  return (
    <ScrollView showsVerticalScrollIndicator={false} refreshControl={
      <RefreshControl refreshing={ref} onRefresh={onRefresh} />
    }>
      <View className='bg-[#181a20] w-full h-auto pb-10'>
        {ld ?
          <View>
            <SuggestedSkeleton />
            <SuggestedSkeleton />
            <SuggestedSkeleton />
            <SuggestedSkeleton />
          </View> :
          <>
            <TrendingAlbum data={trndAlb} topic={"Trending Albums"} />
            <Playlist data={plst} topic={"Playlists"} />
            <Albums data={albums} topic={"Albums"} />
            <Charts data={chst} topic={"Top Flavour"} />
            {trndSong.length > 0 && <TrendingSong data={trndSong} topic='Trending Song' />}
          </>
        }
      </View>
    </ScrollView>
  )
}
export default Suggested