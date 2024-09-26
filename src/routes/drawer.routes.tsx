import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeIcon } from 'lucide-react-native'

import TabRoutes from './tabs.routes'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="home">
      <Drawer.Screen
        name="home"
        component={TabRoutes}
        options={{
          drawerIcon: ({ color, size }) => <HomeIcon size={size} color={color} />,
          drawerLabel: 'Home'
        }}
      />
    </Drawer.Navigator>
  )

}