import { useCallback, useEffect, useState } from "react"
import { onboardingData } from "../constants/navigation"
import { OnBoardingDataTypes } from "../Interfaces/onboard.interface"

export const useOnboarding = (initialState = 0) => {
  const [onIndex, setOnIndex] = useState<number>(0)
  const [data, setData] = useState<OnBoardingDataTypes>(
    onboardingData[initialState]
  )
  const updateData = useCallback((index: number) => {
    setData(onboardingData[index])
  }, [])
  const updateOnIndex = useCallback((val: number) => {
    setOnIndex(val)
  }, [])
  useEffect(() => {
    updateData(onIndex)
  }, [onIndex])
  return [data, updateData, onIndex, updateOnIndex] as const
}
