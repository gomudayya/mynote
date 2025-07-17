import { Pressable, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function MemoWriteButton({size, style, onPress}) {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome name='pencil-square-o' size={size} style={[styles.icon, style]} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginRight : 16,
  }
})