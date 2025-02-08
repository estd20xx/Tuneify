import { useCallback, useState } from "react"
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native"
export const useLyricsView = (initialState = false) => {
  const [isLyricsView, setIsLyricsView] = useState(initialState)

  const toggleLyricsView = useCallback(() => {
    setIsLyricsView((prev) => !prev)
  }, [])
  const handleLyricsScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    setEnableGesture: (isEnabled: boolean) => void
  ) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent
    const scrollY = contentOffset.y
    /**
     *  ScrollY<=0 -> top
     */
  }
  return [isLyricsView, toggleLyricsView] as const
}
