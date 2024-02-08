import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
const SongPlayer = ({ isVisible, onClose }: { isVisible: any, onClose: any }) => {
    return (
        <Modal isVisible={isVisible} style={{ margin: 0 }}>
            <LinearGradient
                colors={['#067a02', '#064f03', '#032901', '#000000']}
                style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ marginTop: 20, marginLeft: 20 }}
                    onPress={() => {
                        onClose();
                    }}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </LinearGradient>
        </Modal>
    );
};

export default SongPlayer;