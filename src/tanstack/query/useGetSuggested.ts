import { useQuery } from "@tanstack/react-query"
import { HomeDataResponse } from "../../api/interface/module.interface"
import { homeService } from "../api/home"

export const useGetSuggested = () => {
  return useQuery<HomeDataResponse, Error>({
    queryKey: ["suggested"],
    queryFn: homeService.getHomeData
  })
}
