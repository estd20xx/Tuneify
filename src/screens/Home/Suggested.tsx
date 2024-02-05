import { View, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import homeHelper from '../../helpers/suggestedHelper'
import { home_url } from '../../api/api'
import {
  AlbumTypes,
  ChartsTypes,
  PlaylistTypes,
  TrendingAlbumTypes,
  TrendingSongTypes
} from '../../Types/Types'
import Albums from '../../components/Albums'
import Playlist from '../../components/Playlist'
import Charts from '../../components/Charts'
import TrendingSong from '../../components/TrendingSong'
import TrendingAlbum from '../../components/TrendingAlbum'
import SuggestedSkeleton from '../../components/skeleton/SuggestedSkeleton'
const Suggested = () => {
  const [albums, setAlbums] = useState<AlbumTypes[]>([])
  const [plst, setPlst] = useState<PlaylistTypes[]>([])
  const [chst, setChst] = useState<ChartsTypes[]>([])
  const [trndSong, setTrndSong] = useState<TrendingSongTypes[]>([])
  const [trndAlb, setTrndAlb] = useState<TrendingAlbumTypes[]>([])
  const [ld, setLd] = useState<boolean>(true)

  const [refreshing, seTFe] = useState(false)
  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(async () => {
    seTFe(true)
    getData()
    wait(2000).then(() => seTFe(false))
  }, [])
  const getData = useCallback(async () => {
    try {

      const result = await homeHelper.getData(home_url)
      setAlbums(result.data.albums)
      setPlst(result.data.playlists)
      setChst(result.data.charts)
      setLd(false)
      setTrndSong(result.data.trending["songs"])
      setTrndAlb(result.data.trending["albums"])
    } catch (error) {
      console.log(error)
    }
  }, [refreshing])
  useEffect(() => {
    getData()
  }, [])
  return (
    <ScrollView showsVerticalScrollIndicator={false} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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