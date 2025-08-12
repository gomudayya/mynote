import { View, StyleSheet, KeyboardAvoidingView, TextInput, Platform, Alert} from 'react-native'
import Colors from '../constants/Colors'
import { useCallback, useEffect, useState } from 'react'
import { saveMemo } from '../storage/MemoStorage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PrimaryButton from './PrimaryButton';

export default function MemoWriteForm({ initialMemo, headerTitle }) {
  const navigation = useNavigation();
  const [memo, setMemo] = useState(initialMemo);
  const [pressStoreButton, setPressStoreButton ] = useState(false);

  useEffect(() => setMemo(initialMemo), [initialMemo]);

  function handleChangeMemoField(property, value) {
    setMemo((prevMemo) => ({...prevMemo, [property]: value}))
  }

  async function handleStoreButton() {
    setPressStoreButton(true);
    await saveMemo(memo);
    navigation.replace("MemoView", {
      memoId: memo.id
    })
  }

  useFocusEffect(
    useCallback(() => {
      navigation.getParent().setOptions({
        ...(headerTitle && { title: headerTitle }),
        headerRight: () => <PrimaryButton label="저장" onPress={handleStoreButton} />
      })
    }, [handleStoreButton, headerTitle])
  )

  useFocusEffect(
    useCallback(() => {
      function beforeRemoveListener(e) {
        if (pressStoreButton) return;
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
    }, [navigation, initialMemo, memo, pressStoreButton])
  );


  return (
    <KeyboardAvoidingView style={styles.rootContainer} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 90}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="메모 제목"
          value={memo?.title}
          onChangeText={(text) => handleChangeMemoField('title', text)}
          placeholderTextColor='#868686ff'
        />
      </View>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.contentInput}
            placeholder="메모 내용"
            multiline={true}
            textAlignVertical="top"
            value={memo?.content}
            onChangeText={(text) => handleChangeMemoField('content', text)}
            placeholderTextColor='#868686ff'
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