import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import React, { memo } from "react"
import { View } from "react-native"
import { FAB, IconButton } from "react-native-paper"
import { PlaybackState, State } from "react-native-track-player"
import { useMd3Colors } from "../../hooks/useMd3"
import { useSongChange } from "../../hooks/useSongChange"
import { applicationService } from "../../services/Tuneify.service"
import { InitialCentralQueue } from "../../store/slices/Queue.slice"

interface ControlersProps {
  isRepeat: boolean
  playbackState:
    | PlaybackState
    | {
        state: undefined
      }
  applicationQueue: InitialCentralQueue
  dispatch: Dispatch<UnknownAction>
  isShuffle: boolean
  toggleShuffle: () => void
}

const Control: React.FC<ControlersProps> = ({
  isRepeat,
  playbackState,
  applicationQueue,
  dispatch,
  isShuffle,
  toggleShuffle
}) => {
  const [previous, next] = useSongChange(isShuffle)
  const md3 = useMd3Colors()
  const isPlaying = playbackState.state === State.Playing
  const isBusy =
    playbackState.state === State.Loading ||
    playbackState.state === State.Buffering

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        marginTop: 8
      }}
    >
      <IconButton
        icon="shuffle-variant"
        size={24}
        iconColor={isShuffle ? md3.primary : md3.onSurfaceVariant}
        containerColor={isShuffle ? md3.secondaryContainer : "transparent"}
        onPress={toggleShuffle}
        accessibilityLabel="Shuffle"
      />
      <IconButton
        icon="skip-previous"
        size={36}
        iconColor={md3.onSurface}
        onPress={() => previous()}
        accessibilityLabel="Previous track"
      />
      <FAB
        icon={isPlaying ? "pause" : "play"}
        loading={isBusy}
        mode="elevated"
        customSize={64}
        color={md3.onPrimaryContainer}
        style={{ backgroundColor: md3.primaryContainer, borderRadius: 20 }}
        onPress={() =>
          applicationService.playPauseAction(
            playbackState,
            applicationQueue,
            dispatch
          )
        }
        accessibilityLabel={isPlaying ? "Pause" : "Play"}
      />
      <IconButton
        icon="skip-next"
        size={36}
        iconColor={md3.onSurface}
        onPress={() => next()}
        accessibilityLabel="Next track"
      />
      <IconButton
        icon={isRepeat ? "repeat" : "repeat-off"}
        size={24}
        iconColor={isRepeat ? md3.primary : md3.onSurfaceVariant}
        containerColor={isRepeat ? md3.secondaryContainer : "transparent"}
        onPress={() => applicationService.repeatMode(applicationQueue, dispatch)}
        accessibilityLabel="Repeat"
      />
    </View>
  )
}
export default memo(Control)
