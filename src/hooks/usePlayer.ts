import { useCallback, useState } from "react"

export const usePlayer = (initialState = true) => {
  const [isPlayer, setIsPlayer] = useState(initialState)

  const togglePlayer = useCallback(() => {
    setIsPlayer((prev) => !prev)
  }, [])

  return [isPlayer, togglePlayer] as const
}
