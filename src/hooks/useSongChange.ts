import { useCallback } from "react"
import TrackPlayer from "react-native-track-player"
export const useSongChange = (isShuffle: boolean) => {
  const shuffle = useCallback(async () => {
    const queueLength = (await TrackPlayer.getQueue()).length
    if (queueLength == 0) return
    if (queueLength == 1) {
      await TrackPlayer.seekTo(0)
      return
    }
    const currentIndex = await TrackPlayer.getActiveTrackIndex()
    let random = Math.floor(Math.random() * (queueLength - 1))
    if (currentIndex != null && random >= currentIndex) random += 1
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
