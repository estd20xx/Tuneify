import React, { useEffect } from "react"
import { Image, Text, TouchableOpacity } from "react-native"
import { View } from "react-native-animatable"
import TextTicker from "react-native-text-ticker"
import {
  PlaybackState,
  State,
  usePlaybackState
} from "react-native-track-player"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { usePlayer } from "../../hooks/usePlayer"
import { applicationService } from "../../services/Tuneify.service"
import {
  changeApplicationSetup,
  tunifyChild
} from "../../store/slices/childState.slice"
import { centralQueue, resetScreen } from "../../store/slices/Queue.slice"
import Show from "../Common/Show"
import SongPlayer from "./SongPlayer"
const BottomPlayer = () => {
  const dispatch = useAppDispatch()
  const [isPlayer, togglePlayer] = usePlayer()
  const playbackState: PlaybackState | { state: undefined } = usePlaybackState()
  const applicationQueue = TypedSelectorHook(centralQueue)
  const playerState = TypedSelectorHook(tunifyChild)
  useEffect(() => {
    if (!playerState.isSetupped) {
      applicationService.setUpPlayer(applicationQueue.data.song ?? null)
      dispatch(changeApplicationSetup())
      dispatch(resetScreen())
    }
  }, [applicationQueue.data])
  return (
    <>
      {applicationQueue.data.song && (
        <View>
          <TouchableOpacity
            className="absolute h-14 w-full bottom-0 flex flex-row items-center justify-center px-3 bg-bottomPlayer"
            activeOpacity={1}
            onPress={togglePlayer}
          >
            <View className="flex flex-row items-center h-full w-11/12 overflow-hidden">
              <Image
                source={{
                  uri: applicationQueue.data.song.artwork
                }}
                style={{ width: 43, height: 43, borderRadius: 5 }}
              />
              <View style={{ marginLeft: 10 }}>
                <TextTicker
                  duration={20000}
                  loop
                  repeatSpacer={50}
                  marqueeDelay={3000}
                  animationType="scroll"
                  className="text-white mb-1 text-xs font-['500']  tracking-wider"
                >
                  {applicationQueue.data.song.title}
                </TextTicker>
                <Text className="text-gray-200 text-[9px] font-['300']">
                  {applicationQueue.data.song.artist.slice(0, 62)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                applicationService.playPauseAction(
                  playbackState,
                  applicationQueue,
                  dispatch
                )
              }
            >
              <Show isVisible={playbackState.state != State.Playing}>
                <Icons.PlayIcon name="play" color={"white"} size={20} />
              </Show>
              <Show isVisible={playbackState.state == State.Playing}>
                <Icons.PlayIcon name="pause" color={"white"} size={20} />
              </Show>
            </TouchableOpacity>
          </TouchableOpacity>
          <SongPlayer isVisible={isPlayer} togglePlayer={togglePlayer} />
        </View>
      )}
    </>
  )
}
export default BottomPlayer
