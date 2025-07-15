import { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native'
import Memo from '../models/Memo';
import MemoStoreButton from '../components/MemoStoreBitton';

export default function WriteMemoScreen({route, navigation}) {
  const memo = route.params?.memo ?? Memo.createEmptyMemo();
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  useEffect(() => {
    navigation.setOptions({
      title: null,
      headerRight: () => <MemoStoreButton memo={new Memo(title, content, 1)} />
    })
  }, [navigation])

  return (
    <View style={styles.rootContainer}>
      <TextInput
        style={styles.titleInput}
        placeholder="메모 제목"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="메모 내용"
        multiline={true}
        textAlignVertical="top"
        value={content}
        onChangeText={setContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontSize: 18,
    borderRadius: 6,
  },
  contentInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
    fontSize: 16,
    borderRadius: 6,
  },
})