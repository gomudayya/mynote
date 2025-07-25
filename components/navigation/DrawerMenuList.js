import { DrawerItem, useDrawerStatus } from '@react-navigation/drawer'
import { StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import { getMemoIdList, saveMemos } from '../../storage/MemoStorage'
import { AntDesign } from '@expo/vector-icons'
import DraggableFlatList from 'react-native-draggable-flatlist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Memo from '../../models/Memo'
import DrawerMemoItem from './DrawerMemoItem'
import * as Haptics from 'expo-haptics';

export default function DrawerMenuList(props) {
  const [memos, setMemos] = useState([]);
  const isDrawerOpen = useDrawerStatus() === 'open';

  
  useEffect(() => {
    async function loadMemos() {
      if (!isDrawerOpen) return;

      const memoIds = await getMemoIdList();
      const jsonMemos = await AsyncStorage.multiGet(memoIds);
      const loadedMemos = jsonMemos.map(([key, value]) => Memo.fromJsonString(value));
      loadedMemos.sort((a, b) => a.position - b.position);

      setMemos(loadedMemos);
    }
    loadMemos();
  }, [isDrawerOpen])

  function renderDrawerItem({ item, drag, isActive }) {
    return (
      <DrawerMemoItem 
        memo={item}
        onLongPress={drag}
        isActive={isActive}
      />
    )
  }

  async function onDragEnd({data}) {
    const newMemos = data.map((item, index) => {
      return {...item, position: index+1}
    });
    setMemos(newMemos);

    await saveMemos(newMemos);
  }

  return (
    <View style={styles.rootContainer}{...props}>
      <DrawerItem label='새 메모 작성' onPress={() => props.navigation.navigate("StackNavigator", {screen: "Home"})} icon={() => <AntDesign name="pluscircleo" size={24} color="black" />}/>
    
      <DraggableFlatList
        data={memos}
        renderItem={renderDrawerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{paddingBottom : 200, gap : 4}}
        onDragEnd={onDragEnd}
        onDragBegin={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop : 30,
    padding : 10,
  },
})