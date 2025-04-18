import React, { memo } from "react"
import { Snackbar } from "react-native-paper"
interface MessageInterface {
  message: string
  isvisible: boolean
  onDismis: (value: boolean) => void
}
const Messanger: React.FC<MessageInterface> = ({
  message,
  isvisible,
  onDismis
}) => {
  return (
    <Snackbar
      style={{
        zIndex: 999
      }}
      visible={isvisible}
      onDismiss={() => {
        onDismis(false)
      }}
      duration={300}
      action={{
        label: "Undo"
      }}
    >
      {message}
    </Snackbar>
  )
}
export default memo(Messanger)
