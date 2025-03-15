import { Dimensions } from "react-native"
export const useDimensions = () => {
  const { height, width } = Dimensions.get("window")
  return [height, width] as const
}
