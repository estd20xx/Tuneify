import { MemoExoticComponent } from "react"
import { Icons } from "../constants/Icon"
export interface ItemTypes {
  name: string
  activeSize: number
  inactiveSize: number
  activeName: string
  inactiveName: string
  Active: typeof Icons.HomeIcon
  Inactive: typeof Icons.HomeIcon
  component: MemoExoticComponent<() => React.JSX.Element>
  active: string
}
