import { useCallback, useState } from "react"

export const useShuffle = (initialState = false) => {
  const [isShuffle, setIsShuffle] = useState<boolean>(initialState)
  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev)
  }, [])
  return [isShuffle, toggleShuffle] as const
}
