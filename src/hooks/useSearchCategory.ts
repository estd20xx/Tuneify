import { useCallback, useState } from "react"
import { SearchCategory } from "../components/Search/Category"

export const useSearchCategory = (initial: SearchCategory = "top") => {
  const [category, setCategory] = useState<SearchCategory>(initial)
  const updateCategory = useCallback((next: SearchCategory) => {
    setCategory(next)
  }, [])
  return [category, updateCategory] as const
}
