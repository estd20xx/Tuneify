import { memo } from "react"
import { RefreshControl, ScrollView, View } from "react-native"
import Show from "../../components/Common/Show"
import MainSkeleton from "../../components/skeleton/MainSkeleton"
import { component } from "../../constants/screens"
import { useGetSuggested } from "../../tanstack/query/useGetSuggested"
const Suggested = () => {
  const { data, isLoading } = useGetSuggested()
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={isLoading} />}
    >
      <View className="w-full h-auto pb-24">
        <Show isVisible={isLoading || data == undefined}>
          <MainSkeleton />
        </Show>
        {data && (
          <View>
            <component.CCharts
              data={data?.tuneifyChartsResponse}
              topic={"Top Flavour"}
            />
            <component.CTrendingAlbum
              data={data?.tuneifyTrendingAlbumsResponse}
              topic={"Trending Albums"}
            />
            <component.CPlaylist
              data={data?.tuneifyTopPlaylistsResponse}
              topic={"Playlists"}
            />
            <component.CAlbums
              data={data?.tuneifyAlbumsResponse}
              topic={"Albums"}
            />
          </View>
        )}
      </View>
    </ScrollView>
  )
}
export default memo(Suggested)
