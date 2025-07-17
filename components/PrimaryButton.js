import { Pressable, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function PrimaryButton({label, onPress, size, style, }) {
  return (
    <Pressable style={({ pressed }) => [
      styles.button,
      pressed && styles.buttonPressed
    ]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary500,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 16,
  },
  buttonPressed: {
    backgroundColor: Colors.primary300,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
