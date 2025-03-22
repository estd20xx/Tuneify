import { useCallback } from "react"
import TrackPlayer from "react-native-track-player"
export const useSongChange = (isShuffle: boolean) => {
  const shuffle = useCallback(async () => {
    const index = (await TrackPlayer.getQueue()).length
    const random = Math.floor(Math.random() * index)
    await TrackPlayer.skip(random)
    return
  }, [])
  const previous = useCallback(
    async () => (isShuffle ? shuffle() : await TrackPlayer.skipToPrevious()),
    [isShuffle]
  )
  const next = useCallback(
    async () => (isShuffle ? shuffle() : await TrackPlayer.skipToNext()),
    [isShuffle]
  )
  return [previous, next] as const
}
