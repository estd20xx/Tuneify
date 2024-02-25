import {Icons} from "../constants/Icon"
export interface ItemTypes {
  name: string
  activeSize: number
  inactiveSize: number
  activeName: string
  inactiveName: string
  Active: typeof Icons.HomeIcon
  Inactive: typeof Icons.HomeIcon
  component: () => React.JSX.Element
  active: string
}
