import { useCallback, useState } from "react"

export const usePlayer = (initialState = true) => {
  const [isPlayer, setIsPlayer] = useState(initialState)
  const [enableGesture, setEnableGesture] = useState(initialState)
  const [showFullPlayer, setShowFullPlayer] = useState(!initialState)
  const [showMiniPlayer, setShowMiniPlayer] = useState(initialState)

  const toggleGesture = useCallback(
    (val: boolean) => setEnableGesture((prev) => val ?? !prev),
    []
  )
  const toggleFullScreen = useCallback(
    (val: boolean) => setShowFullPlayer((prev) => val ?? !prev),
    []
  )
  const toggleMiniPlayer = useCallback(
    (val?: boolean) => setShowMiniPlayer((prev) => val ?? !prev),
    []
  )
  const togglePlayer = useCallback(() => setIsPlayer((prev) => !prev), [])

  return [
    isPlayer,
    togglePlayer,
    enableGesture,
    toggleGesture,
    showFullPlayer,
    toggleFullScreen,
    showMiniPlayer,
    toggleMiniPlayer
  ] as const
}
