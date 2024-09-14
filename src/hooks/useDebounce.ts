import { useCallback, useEffect, useState } from "react"
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
      console.log(query)
    }, milliSeconds)
    return () => {
      clearTimeout(handler)
    }
  }, [query, milliSeconds])
  return { debouncedValue, isloading }
}
