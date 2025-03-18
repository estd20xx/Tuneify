import { useState } from "react"

export const useSearchCategory = () => {
    const [category, setCategory] = useState<number>(0)
    const selectCatrogory = (index: number) => setCategory(index)
    return [category, selectCatrogory] as const
}