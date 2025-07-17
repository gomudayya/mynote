import { useEffect, useState, useCallback, useRef} from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import Memo from '../models/Memo';
import { saveMemo } from '../storage/MemoStorage'
import PrimaryButton from '../components/PrimaryButton';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function WriteMemoScreen({route, navigation}) {
  const initialMemo = Memo.createEmptyMemo();
  const [memo, setMemo] = useState(initialMemo);
  const initialMemoRef = useRef(initialMemo);

  useEffect(() => {
    const routeParamMemo = route.params?.memo;
    if (routeParamMemo) {
      setMemo(routeParamMemo);
      initialMemoRef.current = routeParamMemo;
    }
  }, [route.params?.memo]);

  useFocusEffect(
    useCallback(() => {
      function beforeRemoveListener(e) {
        const initialMemo = initialMemoRef.current;
        if (initialMemo.title === memo.title && initialMemo.content === memo.content) return; // 변경된것이 없으면 Alert를 띄우지 않고, 그냥 뒤로가기

        e.preventDefault();
        Alert.alert(
          '저장하지 않고 나가시겠습니까?',
          '작성한 메모는 저장되지 않습니다.',
          [
            {text: '취소', style: 'cancel',},
            {text: '나가기', style: 'destructive', onPress: () => navigation.dispatch(e.data.action),}
          ]
        )
      }
      return navigation.addListener('beforeRemove', beforeRemoveListener);
    }, [navigation, memo])
  );

  async function handleStoreButton() {
    await saveMemo(memo);
    navigation.navigate("MemoView", {
      'memo': memo
    })
  }

  useFocusEffect(
    useCallback(() => {
      let headerTitle = null;
      if (!memo.isSaved) headerTitle = "새 메모 작성";

      navigation.getParent().setOptions({
        title: headerTitle,
        headerRight: () => <PrimaryButton label="저장" onPress={handleStoreButton} />
      })
    }, [memo.id, memo.isSaved, handleStoreButton])
  )

  function updateTitle(newTitle) {
    setMemo(prevMemo => ({
      ...prevMemo,
      title: newTitle
    }));
  }

  function updateContent(newContent) {
    setMemo(prevMemo => ({
      ...prevMemo,
      content: newContent
    }));
  }

  return (
    <KeyboardAvoidingView style={styles.rootContainer} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 90}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="메모 제목"
          value={memo.title}
          onChangeText={updateTitle}
        />
      </View>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.contentInput}
            placeholder="메모 내용"
            multiline={true}
            textAlignVertical="top"
            value={memo.content}
            onChangeText={updateContent}
          />
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.backgroundWrite
  },
  titleContainer: {
    justifyContent: 'center',
    borderColor: '#aaa',
    borderWidth: 2,
    borderRadius: 6,
    marginBottom: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  titleInput: {
    fontSize: 28,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
    borderWidth: 2,
    borderColor: '#aaa',
    borderRadius: 6,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
  },
})