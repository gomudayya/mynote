import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { useEffect, useState } from 'react'
import { getMemoList, saveMemo } from '../../storage/MemoStorage'
import { FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Memo from '../../models/Memo'

export default function DrawerMenuList(props) {
  const [memos, setMemos] = useState([]);
  useEffect(() => {
    async function loadMemos() {
      // AsyncStorage.clear();

      // const newMemo = new Memo("제목이에영","본문sdfasdf",1);
      // await saveMemo(newMemo);

      const memoIds = await getMemoList();
      const jsonMemos = await AsyncStorage.multiGet(memoIds);
      const loadedMemos = jsonMemos.map(memos => Memo.fromJson(memos[1]));
      setMemos(loadedMemos);
    }
    loadMemos();
  }, [])

  function handlePressDrawerItem (memo) {
    props.navigation.navigate("MemoView", {
      "memo": memo
    });
  }

  return (
    <DrawerContentScrollView {...props}>
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