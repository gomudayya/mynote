import { Pressable, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function MemoWriteButton({size, style, memo}) {
  const navigation =  useNavigation();
  
  return (
    <Pressable onPress={() => navigation.navigate("WriteMemo", {
      "memo": memo,
    })}>
      <FontAwesome name='pencil-square-o' size={size} style={[styles.icon, style]} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginRight : 16,
  }
})