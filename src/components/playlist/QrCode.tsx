import { Minimize2 } from "lucide-react-native"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import QRCode from "react-native-qrcode-svg"
import { TypedSelectorHook } from "../../hooks/store.hook"
import { useDimensions } from "../../hooks/useDimensions"
import { sharedPlaylist } from "../../store/slices/share.slice"
type QrProps = {
  isVisible: boolean
  onpress: () => void
}
const QrCode: React.FC<QrProps> = ({ isVisible, onpress }) => {
  const [height, width] = useDimensions()
  const currentShare = TypedSelectorHook(sharedPlaylist)
  return (
    <Modal className="" isVisible={isVisible}>
      <TouchableOpacity onPress={onpress} className="absolute right-3 top-3">
        <Minimize2 size={30} color={"red"} />
      </TouchableOpacity>
      <View className="h-screen w-full flex items-center justify-center">
        <QRCode
          value={JSON.stringify(currentShare)}
          logo={require("../../assets/images/namelessnerd.jpg")}
          logoSize={30}
          size={height / 2.6}
          ecl="L"
        />
      </View>
    </Modal>
  )
}

export default QrCode
