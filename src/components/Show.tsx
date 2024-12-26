import { memo } from "react"
interface Props {
  isVisible: boolean
  children: React.ReactNode
}
const Show: React.FC<Props> = ({ children, isVisible }) => {
  return isVisible ? children : null
}
export default memo(Show)
