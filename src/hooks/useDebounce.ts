import { useState, useEffect, useCallback } from "react"
export const useDebounce = (query: string, milliSeconds: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(query)
  const [isloading, setIsloading] = useState<boolean>(false)

  const handleSearch = useCallback(async () => {
    setIsloading(true)
    try {
      // api search will be here
    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }, [])
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(query)
    }, milliSeconds)
    return () => {
      clearTimeout(handler)
    }
  }, [query, milliSeconds])
  return { debouncedValue, isloading }
}
