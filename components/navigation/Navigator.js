import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WriteMemoScreen from '../../screens/WriteMemoScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerMenuList from './DrawerMenuList';
import MemoViewScreen from '../../screens/MemoViewScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <DrawerMenuList {...props}/>}
      screenOptions={{
    }}>
      <Drawer.Screen name="Home" component={WriteMemoScreen} />
      <Drawer.Screen name="MemoView" component={MemoViewScreen} />
      <Drawer.Screen name="WriteMemo" component={WriteMemoScreen}></Drawer.Screen>
    </Drawer.Navigator>
  )
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown : false
      }}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}