import { useCallback, useState } from "react"

export const usePlayer = (initialState = false) => {
  const [isPlayer, setIsPlayer] = useState(false)
  const togglePlayer = useCallback(() => {
    setIsPlayer((prev) => !prev)
  }, [])
  return [isPlayer, togglePlayer] as const
}
