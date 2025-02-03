import { useCallback, useState } from "react"
export const useLyricsView = (initialState = false) => {
  const [isLyricsView, setIsLyricsView] = useState(initialState)

  const toggleLyricsView = useCallback(() => {
    setIsLyricsView((prev) => !prev)
  }, [])
  return [isLyricsView, toggleLyricsView] as const
}
