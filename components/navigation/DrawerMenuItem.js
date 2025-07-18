import { Pressable, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react'

function DrawerMenuItem({ onPress, onLongPress, isActive, title, icon}) {
  return (
    <Pressable 
      onPress={onPress}
      onLongPress={onLongPress}
      style={({pressed}) => [styles.itemContainer, isActive && styles.activeItem, pressed && styles.activeItem]}
    >
      {icon || <FontAwesome5 name="sticky-note" size={20} color="#333" />}
      <Text style={styles.itemLabel}>{title}</Text>
    </Pressable>
  )
}

export default React.memo(DrawerMenuItem);
const styles = StyleSheet.create({
  itemContainer: {
    height : 60,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  activeItem: {
    backgroundColor: '#eee',
  },
  itemLabel: {
    marginLeft: 10,
    fontSize: 16,
  }  
})