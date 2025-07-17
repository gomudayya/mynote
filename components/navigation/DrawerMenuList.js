import { DrawerContentScrollView, DrawerItem, useDrawerStatus } from '@react-navigation/drawer'
import { useEffect, useState } from 'react'
import { getMemoList } from '../../storage/MemoStorage'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Memo from '../../models/Memo'

export default function DrawerMenuList(props) {
  const [memos, setMemos] = useState([]);
  const isDrawerOpen = useDrawerStatus() === 'open';

  useEffect(() => {
    async function loadMemos() {
      if (!isDrawerOpen) return;

      const memoIds = await getMemoList();
      const jsonMemos = await AsyncStorage.multiGet(memoIds);
      const loadedMemos = jsonMemos.map(([key, value]) => Memo.fromJsonString(value));
      
      setMemos(loadedMemos);
    }
    loadMemos();
  }, [isDrawerOpen])

  function handlePressDrawerItem (memo) {
    props.navigation.navigate("StackNavigator", {
      screen: "MemoView",
      params: {
        "memo": memo
      }
    });
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label='새 메모 작성' onPress={() => props.navigation.navigate("StackNavigator", {screen: "Home"})} icon={() => <AntDesign name="pluscircleo" size={24} color="black" />}/>

      {memos.map(memo => 
      <DrawerItem 
        key={memo.id}
        label={memo.title} 
        onPress={() => handlePressDrawerItem(memo)}
        icon={({color, size}) => <FontAwesome5 name='sticky-note' color={color} size={size}/>}
      />)}
    </DrawerContentScrollView>
  )
}