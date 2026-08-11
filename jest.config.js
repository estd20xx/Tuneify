module.exports = {
  preset: "react-native",
  setupFiles: ["<rootDir>/jest.setup.js"],
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-gesture-handler|react-native-reanimated|lucide-react-native|react-native-animatable|react-native-modal|react-native-paper|react-native-vector-icons|react-native-svg|react-native-toast-message|react-native-animated-spinkit|react-native-swipe-gestures|react-native-popup-menu|react-redux|redux-persist|@reduxjs/toolkit|@tanstack|@react-navigation|nativewind|@material/material-color-utilities)/)"
  ]
}
