import { View, ScrollView, RefreshControl } from "react-native"
import React, { useEffect, useState, useCallback } from "react"
import { component } from "../../constants/screens"
import SuggestedServices from "../../services/suggested.service"
const service = new SuggestedServices()
import Toast from "react-native-toast-message"
import MainSkeleton from "../../components/skeleton/MainSkeleton"
import { HomeDataResponse } from "../../api/interface/module.interface"
import { HomeService } from "../../api/service/home.service"
const homeService = new HomeService()
const Suggested = () => {
  const [data, setData] = useState<HomeDataResponse>()
  const [ld, setLd] = useState<boolean>(true)
  const [ref, setRef] = useState(false)
  const getDa = async () => {
    try {
      const data = await homeService.getHomeData()
      setData(data)
      setLd(false)
    } catch (error) {
      console.log("error frontend")
    }
  }
  useEffect(() => {
    getDa()
  }, [])
  const onRefresh = useCallback(async () => {
    setRef(true)
    getDa()
    await service.wait(2000).then(() => setRef(false))
  }, [])
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={ref} onRefresh={onRefresh} />}
    >
      <View className=" w-full h-auto pb-10">
        {ld ? (
          <MainSkeleton />
        ) : (
          <>
            {data && (
              <component.CTrendingAlbum
                data={data?.tuneifyTrendingAlbumsResponse}
                topic={"Trending Albums"}
              />
            )}
            {data && (
              <component.CPlaylist
                data={data?.tuneifyTopPlaylistsResponse}
                topic={"Playlists"}
              />
            )}
            {data && (
              <component.CAlbums
                data={data?.tuneifyAlbumsResponse}
                topic={"Albums"}
              />
            )}
            {data && (
              <component.CCharts
                data={data.tuneifyChartsResponse}
                topic={"Top Flavour"}
              />
            )}
          </>
        )}
      </View>
    </ScrollView>
  )
}
export default Suggested
