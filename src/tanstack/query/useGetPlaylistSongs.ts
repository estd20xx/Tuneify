import { useQuery } from "@tanstack/react-query"
import { homeService } from "../api/home"
export const useGetPlaylistSongs = (id: string) => {
  return useQuery({
    queryKey: ["suggestedPlaylist", id],
    queryFn: () => homeService.getPlaylistsSongs(id)
  })
}
