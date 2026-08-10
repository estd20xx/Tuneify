import React, { memo } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import { InfoSection } from "../../constants/settingsContent"
import { useTheme } from "../../hooks/useTheme"

type Props = {
  isVisible: boolean
  title: string
  sections: InfoSection[]
  onClose: () => void
  children?: React.ReactNode
}

const SettingsPanel: React.FC<Props> = ({
  isVisible,
  title,
  sections,
  onClose,
  children
}) => {
  const theme = useTheme()
  return (
    <Modal isVisible={isVisible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View
        style={{ backgroundColor: theme.surfaceRaised }}
        className="w-full max-h-[80%] rounded-2xl p-5"
      >
        <Text className="text-white text-xl font-['500'] mb-3">{title}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {sections.map((section) => (
            <View key={section.heading} className="mb-4">
              <Text
                style={{ color: theme.accent }}
                className="text-base font-['500'] mb-1"
              >
                {section.heading}
              </Text>
              <Text className="text-gray-300 text-sm leading-5 font-['300']">
                {section.body}
              </Text>
            </View>
          ))}
          {children}
        </ScrollView>
        <TouchableOpacity
          onPress={onClose}
          className="mt-3 py-3 rounded-md bg-[#302625] items-center"
        >
          <Text className="text-white">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default memo(SettingsPanel)
