import * as React from 'react'
import {View} from 'react-native'
import {Button, Menu} from 'react-native-paper'
const MyComponent = () => {
  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  return (
    <View
      style={{
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button className="" onPress={openMenu}>
            Show menu
          </Button>
        }>
        <Menu.Item leadingIcon={'delete'} onPress={() => {}} title="Remove" />
      </Menu>
    </View>
  )
}
export default MyComponent
