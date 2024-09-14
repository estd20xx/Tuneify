import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl, ScrollView, View } from "react-native"
import MainSkeleton from "../../components/skeleton/MainSkeleton"
import { component } from "../../constants/screens"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import SuggestedServices from "../../services/suggested.service"
import { homeService } from "../../store/actions/home.action"
import { homeData } from "../../store/slices/home.slice"
const service = new SuggestedServices()
const Suggested = () => {
  const [ref, setRef] = useState(false)
  const dispatch = useAppDispatch()
  const data = TypedSelectorHook(homeData)
  useEffect(() => {
    dispatch(homeService.getHomeData())
  }, [])
  const onRefresh = useCallback(async () => {
    setRef(true)
    dispatch(homeService.getHomeData())
    await service.wait(2000).then(() => setRef(false))
  }, [])
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={ref} onRefresh={onRefresh} />}
    >
      <View className=" w-full h-auto pb-10">
        {data.isLoading && !data.data ? (
          <MainSkeleton />
        ) : (
          data.data && (
            <View>
              <component.CTrendingAlbum
                data={data?.data.tuneifyTrendingAlbumsResponse}
                topic={"Trending Albums"}
              />
              <component.CPlaylist
                data={data?.data.tuneifyTopPlaylistsResponse}
                topic={"Playlists"}
              />
              <component.CAlbums
                data={data?.data.tuneifyAlbumsResponse}
                topic={"Albums"}
              />
              <component.CCharts
                data={data.data.tuneifyChartsResponse}
                topic={"Top Flavour"}
              />
            </View>
          )
        )}
      </View>
    </ScrollView>
  )
}
export default Suggested
