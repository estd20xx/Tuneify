import {View, Text, Image, FlatList, TouchableOpacity} from "react-native"
import React, {useCallback} from "react"
import {settingsData} from "../constants/Settings"
import UserImage from "react-native-fast-image"
import ImagePicker from "react-native-document-picker"
import {TypedSelectorHook, useAppDispatch} from "../hooks/store.hook"
import {changeProfile, tuneifyUser} from "../store/slices/user.slice"
import Toast from "react-native-toast-message"
import appNotification from "../services/appNotification.service"
const Settings = () => {
  const settingData = TypedSelectorHook(tuneifyUser)
  console.log(settingData)
  const dispatch = useAppDispatch()
  const changeImage = useCallback(async () => {
    try {
      const userImage = await ImagePicker.pickSingle({
        type: ImagePicker.types.images,
      })
      dispatch(changeProfile(userImage.uri))
    } catch {
      appNotification.errorMessage("error", "something bad happens")
    }
  }, [])
  return (
    <View className="w-full h-screen ">
      <View className="w-full  h-auto flex items-center flex-row justify-center">
        <Text className="  text-white text-base tracking-wider font-['400']">
          Setting
        </Text>
      </View>

      <View className="w-full h-20  overflow-hidden flex items-center flex-row pl-2">
        <TouchableOpacity className="-z-30" onPress={() => changeImage()}>
          <UserImage
            source={{
              uri: settingData.image,
              headers: {Authorization: "userImage"},
              priority: UserImage.priority.high,
              cache: UserImage.cacheControl.immutable,
            }}
            className="h-16 w-16 rounded-full"
          />
        </TouchableOpacity>
        <Text className=" ml-3 text-white font-['300'] text-xl">
          {settingData.userName}
        </Text>
      </View>
      <Toast />
      <FlatList
        data={settingsData}
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
