import { useCallback, useState } from "react"

export const usePlaylist = (initialState = false) => {
  const [isPlaylist, setIsPlaylist] = useState<boolean>(initialState)
  const togglePlayist = useCallback(() => {
    setIsPlaylist((prev) => !prev)
  }, [])
  return [isPlaylist, togglePlayist] as const
}
