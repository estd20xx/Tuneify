import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.log("Unhandled UI error:", error)
  }

  private reset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <View className="w-full h-full flex items-center justify-center bg-background px-8">
        <Text className="text-white text-lg font-['500'] mb-2">
          Something went wrong
        </Text>
        <Text className="text-gray-400 text-sm text-center mb-6 font-['300']">
          This screen ran into a problem. Your music and playlists are safe.
        </Text>
        <TouchableOpacity
          onPress={this.reset}
          className="px-8 py-3 rounded-md bg-themeOrange"
        >
          <Text className="text-white">Try again</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ErrorBoundary
