import { useCallback, useState } from "react"
import { SearchedSongQueryParams } from "../screens/Search"

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState<SearchedSongQueryParams>({
    p: 1,
    q: "",
    n: 50
  })
  const updateQuery = useCallback((updatedQuery: SearchedSongQueryParams) => {
    setSearchQuery(updatedQuery)
  }, [])
  return [searchQuery, updateQuery] as const
}
