import { View, Text, StyleSheet, Pressable } from 'react-native';

import { saveMemo } from '../storage/MemoStorage';

export default function MemoStoreButton({ memo }) {
  async function handleSaveButton() {
    console.log(memo);
    await saveMemo(memo);
  }


  return (
    <Pressable style={({ pressed }) => [
      styles.button,
      pressed && styles.buttonPressed
    ]} onPress={handleSaveButton}>
      <Text style={styles.text}>저장하기</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#005BBB',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
