import { ImageSourcePropType } from "react-native"

export interface SettingsAssetsInterface {
  leftIcon: ImageSourcePropType
  title: String
  command: String
}

export const settingsData: SettingsAssetsInterface[] = [
  {
    leftIcon: require("../assets/images/setting.png"),
    title: "General Settings",
    command: "general"
  },
  {
    leftIcon: require("../assets/images/backup-file.png"),
    title: "BackUp",
    command: "backup"
  },
  {
    leftIcon: require("../assets/images/notification.png"),
    title: "Notification",
    command: "notification"
  },
  {
    leftIcon: require("../assets/images/language.png"),
    title: "Language",
    command: "language"
  },
  {
    leftIcon: require("../assets/images/mode.png"),
    title: "Accent Color",
    command: "accent-color"
  },
  {
    leftIcon: require("../assets/images/shareApp.png"),
    title: "Share App",
    command: "share"
  },
  {
    leftIcon: require("../assets/images/log.png"),
    title: "Change Log",
    command: "log"
  },
  {
    leftIcon: require("../assets/images/privacy.png"),
    title: "Privacy Policy",
    command: "privacy"
  },
  {
    leftIcon: require("../assets/images/faq.png"),
    title: "FAQ",
    command: "faq"
  },
  {
    leftIcon: require("../assets/images/info.png"),
    title: "About Tuneify",
    command: "about"
  },
  {
    leftIcon: require("../assets/images/exit.png"),
    title: "Quit",
    command: "quit"
  }
]
