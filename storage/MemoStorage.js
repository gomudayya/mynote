import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid'
import Memo from "../models/Memo";

/*
<key :memoId, value: {Memo.js (object-to-json)}>
*/
export async function saveMemo(memo) {
  try { 
    memo.isSaved = true;
    await AsyncStorage.setItem(memo.id, JSON.stringify(memo));
    let memoList = await getMemoList();
    if (!memoList.includes(memo.id)) {
      memoList.push(memo.id);
      await AsyncStorage.setItem('memoList', JSON.stringify(memoList));
    }
  } catch(error) {
    console.error('메모 저장 실패', error);
  }
}

export async function getMemoById(memoId) {
  try {
    const jsonValue = await AsyncStorage.getItem(memoId);
    return Memo.fromJsonString(jsonValue);
  } catch(error) {
    console.error('메모 가져오기 실패', error);
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

export async function deleteMemoById(memoId) {
  try {
    await AsyncStorage.removeItem(memoId);
    let memoList = await getMemoList();
    memoList = memoList.filter(id => id !== memoId);

    await AsyncStorage.setItem('memoList', JSON.stringify(memoList));
  } catch(error) {
    console.error('메모 삭제 실패', error);
  }
}