import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'

import MemoWriteButton from '../components/MemoWriteButton';
export default function MemoViewScreen({route, navigation}) {
  const { memo } = route.params;
  useEffect(() => {
    navigation.setOptions({ 
      title : null,
      headerRight: () => <MemoWriteButton size={34} memo={memo} />
    })
  }, [navigation, memo])
  
  
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{memo.title}</Text>
      <Text style={styles.content}>{memo.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontSize: 18,
    borderRadius: 6,
  },
  content: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
    fontSize: 16,
    borderRadius: 6,
  },
})