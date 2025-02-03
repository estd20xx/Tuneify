import { useCallback, useState } from "react"
export const useFetchingState = (initialState = false) => {
  const [isInitialSearch, setIsInitialSearch] = useState(!initialState)
  const [isFetchingMore, setIsFetchingMore] = useState(initialState)

  const updateInitial = useCallback((val: boolean) => {
    setIsInitialSearch(val)
  }, [])
  const updateFetchingMore = useCallback((val: boolean) => {
    setIsFetchingMore(val)
  }, [])

  return [
    isInitialSearch,
    updateInitial,
    isFetchingMore,
    updateFetchingMore
  ] as const
}
