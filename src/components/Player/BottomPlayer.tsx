import {
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SongPlayer from './SongPlayer';
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Track, usePlaybackState, State, Event, useTrackPlayerEvents } from 'react-native-track-player'
import { songsList } from '../../constants/songs'
import { View } from 'react-native-animatable';
import { Icons } from '../../constants/Icon';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { musifyData } from '../../store/Musify';
const BottomPlayer = () => {
    const TypedHook: TypedUseSelectorHook<RootState> = useSelector
    const data = TypedHook(musifyData)
    const [songList, setSongList] = useState(data.storeSong)
    const [isVisible, setIsVisible] = useState(false)
    const [currentTrack, setCurrentTrrack] = useState<Track>()
    const playbackState = usePlaybackState();
    const setUpPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer({ maxCacheSize: 1024 * 10, autoHandleInterruptions: true})
            await TrackPlayer.updateOptions({
                android: {
                    appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
                },
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                    Capability.SeekTo
                ],
                compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious]
            })
            await TrackPlayer.add(data.storeSong)
            handleBottomCondition()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (data.storeSong.length > 0) {
            setUpPlayer()
        }
    }, [data]);
    const handleBottomCondition = async () => {
        try {
            let trackIndex = await TrackPlayer.getCurrentTrack();
            let trackObject = await TrackPlayer.getTrack(trackIndex!)


            trackObject && setCurrentTrrack(trackObject)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePlay = async () => {
        try {
            console.log("called play")
            await TrackPlayer.play()
            // let trackIndex = await TrackPlayer.getCurrentTrack();
            // console.log("playing Number =>  " + trackIndex)
            // let trackObject = await TrackPlayer.getTrack(trackIndex!);
            // console.log(`Title: ${trackObject?.title}`);

            // const position = await TrackPlayer.getPosition();
            // console.log("Position => " + position)
            // const duration = await TrackPlayer.getDuration();
            // console.log("Duration => " + duration)
        } catch (error) {
            console.log(error)
        }
    }
    const playPauseAction = () => {
        playbackState.state == "playing" ? TrackPlayer.pause() : TrackPlayer.play()
    }
    const events = [
        Event.PlaybackState,
        Event.PlaybackError,
    ];
    useTrackPlayerEvents(events, (event: any) => {
        event.state == State.Playing && handleBottomCondition()
    })
    return (
        <>
            {currentTrack &&
                <View>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            width: '100%',
                            height: 70,
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: '#2D3250',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                            paddingRight: 20,
                            justifyContent: 'space-between',
                        }} onPress={() => {
                            setIsVisible(true)
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{ uri: currentTrack?.artwork }}
                                style={{ width: 50, height: 50, borderRadius: 5 }}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text className='text-white text-[14px] mb-1'>{currentTrack.title}</Text>
                                <Text style={{ color: 'white', fontSize: 10 }}>{currentTrack.artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={playPauseAction}>
                            {playbackState.state == "playing" ?
                                <Icons.PlayIcon name='pause' color={"white"} size={30} /> :
                                <Icons.PlayIcon name='play' color={"white"} size={30} />
                            }
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <SongPlayer
                        isVisible={isVisible}
                        onClose={() => {
                            setIsVisible(false)
                        }}
                    />
                </View>

            }
        </>
    );
};

export default BottomPlayer;

//'#a34c0d', '#592804', '#241001', '#000000'