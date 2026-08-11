import { Minimize2 } from "lucide-react-native"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import QRCode from "react-native-qrcode-svg"
import { TypedSelectorHook } from "../../hooks/store.hook"
import { useDimensions } from "../../hooks/useDimensions"
import { playlistShareService } from "../../services/playlistShare.service"
import { sharedPlaylist } from "../../store/slices/share.slice"
type QrProps = {
  isVisible: boolean
  onpress: () => void
}
const QrCode: React.FC<QrProps> = ({ isVisible, onpress }) => {
  const [height, width] = useDimensions()
  const currentShare = TypedSelectorHook(sharedPlaylist)
  const [payload, setPayload] = useState<string>("")
  const [tooBig, setTooBig] = useState<boolean>(false)

  useEffect(() => {
    let active = true
    if (!isVisible || !currentShare?.songs?.length) {
      setPayload("")
      setTooBig(false)
      return
    }
    playlistShareService.encode(currentShare).then((encoded) => {
      if (!active) return
      setTooBig(!encoded.fits)
      setPayload(encoded.fits ? encoded.payload : "")
    })
    return () => {
      active = false
    }
  }, [isVisible, currentShare])

  return (
    <Modal className="" isVisible={isVisible}>
      <TouchableOpacity onPress={onpress} className="absolute right-3 top-3">
        <Minimize2 size={30} color={"red"} />
      </TouchableOpacity>
      <View className="h-screen w-full flex items-center justify-center">
        {payload ? (
          <QRCode
            value={payload}
            logo={require("../../assets/images/namelessnerd.jpg")}
            logoSize={30}
            size={height / 2.6}
            ecl="L"
          />
        ) : tooBig ? (
          <Text className="text-white text-base text-center px-8">
            This playlist is too large to fit in a QR code. Remove a few songs
            and try again.
          </Text>
        ) : (
          <ActivityIndicator color={"#ff8216"} />
        )}
      </View>
    </Modal>
  )
}

export default QrCode
