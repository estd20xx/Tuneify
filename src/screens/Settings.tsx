import {View, Text, Image, FlatList, TouchableOpacity} from "react-native"
import React from "react"
import {Icons} from "../constants/Icon"
const data = [
  {
    leftIcon: require("../assets/images/setting.png"),
    title: "General Settings",
    link: "",
  },
  {
    leftIcon: require("../assets/images/backup-file.png"),
    title: "BackUp",
    link: "",
  },
  {
    leftIcon: require("../assets/images/notification.png"),
    title: "Notification",
    link: "",
  },
  {
    leftIcon: require("../assets/images/language.png"),
    title: "Language",
    link: "",
  },
  {
    leftIcon: require("../assets/images/mode.png"),
    title: "Accent Color",
    link: "",
  },
  {
    leftIcon: require("../assets/images/shareApp.png"),
    title: "Share App",
    link: "",
  },
  {
    leftIcon: require("../assets/images/log.png"),
    title: "Change Log",
    link: "",
  },
  {
    leftIcon: require("../assets/images/privacy.png"),
    title: "Privacy Policy",
    link: "",
  },
  {
    leftIcon: require("../assets/images/faq.png"),
    title: "FAQ",
    link: "",
  },
  {
    leftIcon: require("../assets/images/info.png"),
    title: "About Tuneify",
    link: "",
  },
  {
    leftIcon: require("../assets/images/exit.png"),
    title: "Quit",
    link: "",
  },
]
const Settings = () => {
  return (
    <View className="w-full h-screen ">
      <View className="w-full mb-5 mt-4 h-auto flex items-center flex-row justify-end pr-3 py-2 ">
        <Text className="absolute left-4 text-white text-3xl tracking-wider font-['400'] shadow-md">
          Setting
        </Text>
        <Icons.MoreIcon name="more-horiz" size={30} color={"white"} />
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                width: "95%",
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 2,
                paddingRight: 5,
                marginTop: 4,
                alignSelf: "center",
                // backgroundColor: "red"
              }}>
              <Image
                source={item.leftIcon}
                style={{tintColor: "#d0d0d1"}}
                className="h-5 w-5"
              />
              <Text className="ml-4 text-gray-300 text-base font-['300'] tracking-widest">
                {item.title}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
export default Settings
