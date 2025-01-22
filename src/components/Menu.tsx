import * as React from 'react';
import { View } from 'react-native';
import { Button, Divider, Menu, PaperProvider } from 'react-native-paper';
const MyComponent = () => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return (
        <PaperProvider>
            <View
                style={{
                    zIndex: 10000
                }}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Show menu</Button>}>
                    <Menu.Item onPress={() => { }} title="Item 1" />
                    <Menu.Item onPress={() => { }} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => { }} title="Item 3" />
                </Menu>
            </View>
        </PaperProvider>
    );
};

export default MyComponent;