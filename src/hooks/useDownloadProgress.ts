import { useCallback, useState } from "react"

export const useDownloadProgress = (initialState = 0) => {
  const [downloadProgress, setDownloadProgress] = useState<number>(initialState)
  const updateDownloadValue = useCallback((val: number) => {
    setDownloadProgress(val)
  }, [])
  return [downloadProgress, updateDownloadValue] as const
}
