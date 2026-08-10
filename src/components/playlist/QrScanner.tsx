import { Minimize2 } from "lucide-react-native"
import React, { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import QRCodeScanner from "react-native-qrcode-scanner"
import { useAppDispatch } from "../../hooks/store.hook"
import appNotification from "../../services/appNotification.service"
import PermissionService from "../../services/permission.service"
import { playlistShareService } from "../../services/playlistShare.service"
import { importPlaylist } from "../../store/slices/offlinePlaylist.slice"

const permission = new PermissionService()

type ScannerProps = {
  isVisible: boolean
  onClose: () => void
}

const QrScanner: React.FC<ScannerProps> = ({ isVisible, onClose }) => {
  const dispatch = useAppDispatch()
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const busy = useRef<boolean>(false)

  useEffect(() => {
    if (!isVisible) {
      busy.current = false
      return
    }
    permission.askCameraPermission().then(setAllowed)
  }, [isVisible])

  const handleRead = async (event: { data: string }) => {
    if (busy.current) return
    busy.current = true
    const playlist = await playlistShareService.decode(event?.data)
    if (!playlist) {
      appNotification.errorMessage(
        "Not a playlist",
        "That QR code is not a Tuneify playlist."
      )
      busy.current = false
      return
    }
    dispatch(importPlaylist(playlist))
    appNotification.successMessage(
      playlist.name || "Playlist",
      `${playlist.songs.length} songs added`
    )
    onClose()
  }

  return (
    <Modal isVisible={isVisible} onBackButtonPress={onClose}>
      <TouchableOpacity onPress={onClose} className="absolute right-3 top-3 z-50">
        <Minimize2 size={30} color={"red"} />
      </TouchableOpacity>
      <View className="h-screen w-full flex items-center justify-center">
        {allowed === null ? (
          <ActivityIndicator color={"#ff8216"} />
        ) : allowed ? (
          <QRCodeScanner
            onRead={handleRead}
            reactivate={false}
            showMarker={true}
            cameraStyle={{ height: "100%" }}
            topContent={
              <Text className="text-white text-base">
                Point at a shared playlist QR code
              </Text>
            }
          />
        ) : (
          <Text className="text-white text-base text-center px-8">
            Camera permission is needed to scan a shared playlist.
          </Text>
        )}
      </View>
    </Modal>
  )
}

export default QrScanner
