import { memo } from "react"
import { Image } from "react-native"
import tempImage from "../../assets/images/commingSoon.png"
import CommingSoon from "../../components/Common/CommingSoon"
import { useAppDispatch } from "../../hooks/store.hook"
const localImage = Image.resolveAssetSource(tempImage).uri
const Artists = () => {
  const dispatch = useAppDispatch()
  return <CommingSoon />
}
export default memo(Artists)
