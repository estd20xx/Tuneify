import React, { memo } from "react"
import { TouchableOpacity } from "react-native"

import { ActivityIndicator } from "react-native-paper"
import { Icons } from "../../constants/Icon"
import Show from "../Common/Show"

type Props = {
  onPress: () => void
  downloadProgress: number
}
const DownloadButton: React.FC<Props> = ({ onPress, downloadProgress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Show isVisible={downloadProgress > 0}>
        <ActivityIndicator animating={true} color={"green"} />
      </Show>
      <Show isVisible={downloadProgress == 0}>
        <Icons.MoreIcon name="download" size={23} color={"#ff8216"} />
      </Show>
    </TouchableOpacity>
  )
}
export default memo(DownloadButton)
