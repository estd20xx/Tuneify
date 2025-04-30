import { useQuery } from "@tanstack/react-query"
import { AlbumDetailsResponse } from "../../api/interface/album.interface"
import { homeService } from "../api/home"
export const useGetAlbumSongs = (id: string) => {
  return useQuery<AlbumDetailsResponse, Error>({
    queryKey: ["suggestedAlbumdetails", id],
    queryFn: () => homeService.getAlbumSongs(id)
  })
}
