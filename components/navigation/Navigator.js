import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WriteMemoScreen from '../../screens/WriteMemoScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerMenuList from './DrawerMenuList';
import MemoViewScreen from '../../screens/MemoViewScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animation: 'none',
    }}>
      <Stack.Screen name="Home" component={WriteMemoScreen} options={{}}/>
      <Stack.Screen name="MemoView" component={MemoViewScreen} />
      <Stack.Screen name="WriteMemo" component={WriteMemoScreen} />
    </Stack.Navigator>
  );
}
export default function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerContent={(props) => <DrawerMenuList {...props}/>}
        screenOptions={{}}>
          <Drawer.Screen name="StackNavigator" component={StackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}