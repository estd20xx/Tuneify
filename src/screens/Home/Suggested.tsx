import React, { memo, useEffect } from "react"
import { RefreshControl, ScrollView, View } from "react-native"
import Show from "../../components/Common/Show"
import MainSkeleton from "../../components/skeleton/MainSkeleton"
import { component } from "../../constants/screens"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { homeService } from "../../store/actions/home.action"
import { homeData } from "../../store/slices/home.slice"
const Suggested = () => {
  const dispatch = useAppDispatch()
  const suggested = TypedSelectorHook(homeData)
  useEffect(() => {
    dispatch(homeService.getHomeData())
  }, [])
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={suggested.isLoading}
          onRefresh={() => dispatch(homeService.getHomeData())}
        />
      }
    >
      <View className=" w-full h-auto pb-24">
        <Show isVisible={suggested.isLoading && suggested.data == null}>
          <MainSkeleton />
        </Show>
        <Show isVisible={suggested.data != null}>
          {suggested.data && (
            <View>
              <component.CCharts
                data={suggested.data?.tuneifyChartsResponse}
                topic={"Top Flavour"}
              />
              <component.CTrendingAlbum
                data={suggested.data?.tuneifyTrendingAlbumsResponse}
                topic={"Trending Albums"}
              />
              <component.CPlaylist
                data={suggested?.data?.tuneifyTopPlaylistsResponse}
                topic={"Playlists"}
              />
              <component.CAlbums data={suggested?.data?.tuneifyAlbumsResponse} topic={"Albums"} />
            </View>
          )}
        </Show>
      </View>
    </ScrollView>
  )
}
export default memo(Suggested)
