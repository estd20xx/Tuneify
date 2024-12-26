import Toast from "react-native-toast-message"
class AppNotification {
  public successMessage = (title: string, message: string) => {
    Toast.show({
      type: "success",
      text1: title,
      text2: message,
      visibilityTime: 8000,
      autoHide: true,
      swipeable: true,
      text1Style: {
        color: "#16FF00"
      },
      text2Style: {
        color: "white"
      }
    })
  }
  public errorMessage = (title: string, message: string) => {
    Toast.show({
      type: "error",
      text1: title,
      text2: message,
      visibilityTime: 8000,
      autoHide: true,
      swipeable: true,
      text1Style: {
        color: "#FF004D"
      },
      text2Style: {
        color: "white"
      }
    })
  }
}
const appNotification = new AppNotification()
export default appNotification
