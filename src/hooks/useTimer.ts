import { useCallback, useState } from "react"
export const useTimer = (initialState = false) => {
  const [timer, setTimer] = useState(initialState)
  const [isTimerModal, setIsTimerModal] = useState(initialState)
  const [value, setValue] = useState<number>(0)

  const setTimerValue = useCallback((val: number) => {
    setValue(val)
  }, [])

  const toggleModal = useCallback(() => {
    setIsTimerModal((prev) => !prev)
  }, [])

  const toggleTimer = useCallback(() => {
    setTimer((prev) => !prev)
  }, [])

  return [
    timer,
    toggleTimer,
    isTimerModal,
    toggleModal,
    value,
    setTimerValue
  ] as const
}
