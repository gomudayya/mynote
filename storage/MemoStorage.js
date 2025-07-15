import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid'
import Memo from "../models/Memo";

/*
<key :memoId, value: {Memo.js (object-to-json)}>
*/
export async function saveMemo(memo) {
  const id = uuid.v4();
  memo.id = id;
  try { 
    await AsyncStorage.setItem(memo.id, memo.toJson());

    let memoList = await getMemoList();
    if (!memoList.includes(memo.id)) {
      memoList.push(memo.id);
      await AsyncStorage.setItem('memoList', JSON.stringify(memoList));
    }
    return id;
  } catch(error) {
    console.error('메모 저장 실패', error);
  }
}

export async function getMemo(memoId) {
  try {
    const jsonValue = await AsyncStorage.getItem(memoId);
    return Memo.fromJson(jsonValue);
  } catch(error) {
    console.error('메모 가져오기', error);
  }
}

export async function getMemoList() {
  try {
    const jsonValue = await AsyncStorage.getItem('memoList');
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch(error) {
    console.error('메모 리스트 불러오기 실패', error);
    return [];
  }
}