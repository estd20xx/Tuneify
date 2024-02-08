import {
    Text,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SongPlayer from './SongPlayer';
import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from 'react-native-track-player'
import { songsList } from '../../constants/songs'
const BottomPlayer = () => {
    const [isVisible, setIsVisible] = useState(false)
    const setUpPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer({ maxCacheSize: 1024 * 5 })
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
                compactCapabilities: [Capability.Play, Capability.Pause]
            })
            await TrackPlayer.add(songsList)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setUpPlayer()
        return () => { setUpPlayer() }
    }, []);
    const handlePlay = async () => {
        try {
            await TrackPlayer.play()
            let trackIndex = await TrackPlayer.getCurrentTrack();
            console.log("playing Number =>  " + trackIndex)
            let trackObject = await TrackPlayer.getTrack(trackIndex!);
            console.log(`Title: ${trackObject?.title}`);

            const position = await TrackPlayer.getPosition();
            console.log("Position => " + position)
            const duration = await TrackPlayer.getDuration();
            console.log("Duration => " + duration)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePause = async () => {
        try {
            await TrackPlayer.pause()
        } catch (error) {
            console.log(error)
        }
    }
    const handlePrevious = async () => {
        try {
            await TrackPlayer.skipToPrevious()
        } catch (error) {
            console.log(error)
        }
    }
    const handleNext = async () => {
        try {
            await TrackPlayer.skipToNext()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <LinearGradient
            colors={['#a34c0d', '#592804', '#241001', '#000000']}
            style={{ flex: 1 }}>
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    width: '100%',
                    height: 70,
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: '#7E2553',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 20,
                    paddingRight: 20,
                    justifyContent: 'space-between',
                }} onPress={() => {
                    setIsVisible(true)
                }}>
                <TouchableOpacity className='bg-green-500 py-3 px-2 rounded-lg' onPress={handlePrevious}>
                    <Text>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity className='bg-green-500 py-3 px-2 rounded-lg' onPress={handlePlay}>
                    <Text>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity className='bg-green-500 py-3 px-2 rounded-lg' onPress={handlePause}>
                    <Text>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext} className='bg-green-500 py-3 px-2 rounded-lg'>
                    <Text>Next</Text>
                </TouchableOpacity>
            </TouchableOpacity>
            <SongPlayer
                isVisible={isVisible}
                onClose={() => {
                    setIsVisible(false)
                }}
            />
        </LinearGradient>
    );
};

export default BottomPlayer;

//'#a34c0d', '#592804', '#241001', '#000000'