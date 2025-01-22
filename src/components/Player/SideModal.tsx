import React from "react"
import { TouchableOpacity } from "react-native"
import { View } from "react-native-animatable"
import Modal from "react-native-modal"
import { Text } from "react-native-paper"
type Props = {
  isVisible: boolean
  setSecond: (isVisible: boolean) => void
}
const SideModal: React.FC<Props> = ({ isVisible, setSecond }) => {
  return (
    <Modal
      isVisible={isVisible}
      style={{
        flex: 1
      }}
      animationIn={"slideInRight"}
      animationOut={"slideOutLeft"}
      onBackButtonPress={() => setSecond(false)}
    >
      <View
        className="w-full h-screen bg-[#15130b] flex items-center justify-center absolute
            right-0
            "
      >
        <View className="h-20 w-full bg-[#201b18] absolute bottom-0 flex items-center justify-evenly flex-row">
          <TouchableOpacity
            className="w-2/5 rounded-md bg-[#302625] py-3 flex items-center justify-center"
            onPress={() => setSecond(false)}
          >
            <Text>cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-2/5 rounded-md bg-[#302625] py-3 flex items-center justify-center">
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
export default SideModal
