import { Pressable, Text, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

export default function HeaderRightButton({ onPress }) {
  return (
    <Pressable
      // onPress={(onPress) => console.log('Log out tapped')}
      onPress={onPress}
      style={({ pressed }) =>
      [pressed ? styles.pressedButton : styles.unpressedButton, styles.buttonWrapper]}
    >
      <Text style={styles.text}>Log out</Text>
    </Pressable>
  );
}

const styles = ({
  pressedButton: {
    backgroundColor: 'purple',
  },
  unpressedButton: {
    backgroundColor: 'red',
  },
  buttonWrapper: {
    // opacity: 0.5,
    margin: 10,
    borderRadius: 1,
    padding: 4,
    width: 70,
    height: 25,
  },
  text: {
    fontSize: 18,
    justifyContent: "center",
    
  },
});

