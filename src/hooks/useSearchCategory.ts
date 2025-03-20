import { useState } from "react"

export const useSearchCategory = () => {
  const [category, setCategory] = useState<number>(0)
  const updateCategory = (index: number) => setCategory(index)
  return [category, updateCategory] as const
}
