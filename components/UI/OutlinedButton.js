import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/colors";

export const OutlinedButton = ({ icon, onPress, children }) => {
  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={onPress}>
      <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500} />
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary500,
    borderRadius: 4
  },
  pressed: {
    opacity: 0.75
  },
  icon: {
    marginRight: 6
  },
  buttonText: {
    color: Colors.primary500
  }
})
