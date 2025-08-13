import { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native'

import PrimaryButton from '../components/PrimaryButton';
import { deleteMemoById } from '../storage/MemoStorage';
import Colors from '../constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { getMemoById } from '../storage/MemoStorage';
import Memo from '../models/Memo';

export default function MemoViewScreen({route, navigation}) {
  const { memoId } = route.params;
  const [ memo, setMemo ] = useState(Memo.createEmptyMemo());

  useEffect(() => {
    async function loadMemo(memoId) {
      const fetchedMemo = await getMemoById(memoId);
      setMemo(fetchedMemo);
    }

    loadMemo(memoId);
  }, [memoId])

  function handleMemoUpdateButton() {
    navigation.replace("UpdateMemo", {
      memoId: memoId,
    });
  }

  function handleMemoDeleteButton() {
    async function deleteMemo(memoId) {
      await deleteMemoById(memoId);
    }

    Alert.alert(
      "삭제 확인", // 제목
      "정말로 이 메모를 삭제하시겠습니까?", // 메시지
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "삭제",
          style: "destructive", // IOS에서만 빨간색 표시, 안드로이드 X
          onPress: () => {
            deleteMemo(memo.id);
            navigation.replace("Home", {memoId : null});
          }
        }
      ]
    );
  }

  useFocusEffect(
    useCallback(() => {
      navigation.getParent().setOptions({
        title: null,
        headerRight: () => (
          <View style={styles.headerButtonContainer}>
            <PrimaryButton label="삭제" onPress={handleMemoDeleteButton} />
            <PrimaryButton label="수정" onPress={handleMemoUpdateButton} />
          </View>
        )
      });
    }, [navigation, memoId, handleMemoDeleteButton, handleMemoUpdateButton])
  );
    
  return (
    <View style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{memo.title}</Text>
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{memo.content}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 60,
    backgroundColor: Colors.backgroundView
  },
  titleContainer: {
    justifyContent: 'center',
    marginBottom: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 28,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  content: {
    fontSize: 16,
  },
  headerButtonContainer: {
    flexDirection: 'row',
    
  }
})