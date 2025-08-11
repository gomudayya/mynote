import { Pressable, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

function DrawerMemoItem({ memo, onLongPress, isActive}) {
  const navigation  = useNavigation();
  function handlePress() {
    navigation.navigate("StackNavigator", {
      screen: "MemoView",
      params: {
        "memo": memo
      }
    });
  }
  
  return (
    <Pressable 
      onPress={handlePress}
      onLongPress={onLongPress}
      style={({pressed}) => [styles.itemContainer, isActive && styles.activeItem, pressed && styles.activeItem]}
    >
      <FontAwesome5 name="sticky-note" size={20} color="#333" />
      <Text style={styles.itemLabel}>{memo.title}</Text>
    </Pressable>
  )
}

function memoEqual(memoA, memoB) {
  return memoA.id === memoB.id && memoA.content === memoB.content && memoA.title === memoB.title;
}

export default React.memo(DrawerMemoItem , (prevProps, nextProps) => {
  return memoEqual(prevProps.memo, nextProps.memo) &&
        prevProps.isActive === nextProps.isActive && 
        prevProps.onLongPress === nextProps.onLongPress;
});

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