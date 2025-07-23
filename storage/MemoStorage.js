import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid'
import Memo from "../models/Memo";

/*
<key :memoId, value: {Memo.js (object-to-json)}>
*/
export async function saveMemo(memo) {
  try { 
    memo.isSaved = true;
    let memoIds = await getMemoIdList();
    if (!memoIds.includes(memo.id)) {
      const maxPosition = await getMaxPosition(memoIds);
      memo.position = maxPosition + 1;
      memoIds.push(memo.id);
      await AsyncStorage.setItem('memoList', JSON.stringify(memoIds));
    }
    await AsyncStorage.setItem(memo.id, JSON.stringify(memo));
  } catch(error) {
    console.error('메모 저장 실패', error);
  }
}

export async function saveMemos(memos) {
  try {
    const convertedMemos = memos.map((item) => [item.id, JSON.stringify(item)]);
    AsyncStorage.multiSet(convertedMemos);
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

export async function getMemoIdList() {
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
    let memoList = await getMemoIdList();
    memoList = memoList.filter(id => id !== memoId);

    await AsyncStorage.setItem('memoList', JSON.stringify(memoList));
  } catch(error) {
    console.error('메모 삭제 실패', error);
  }
}

async function getMaxPosition(memoIds) {
  try {
    const memos = await AsyncStorage.multiGet(memoIds);
    const maxPosition = Math.max(...memos.map(([key, value]) => Memo.fromJsonString(value).position));
    return maxPosition;
  } catch(error) {
    console.error('max position 계산 실패', error);
  }
}