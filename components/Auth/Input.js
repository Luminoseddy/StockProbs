import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/LoginSignupStyle';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>

      <TextInput
        style={[styles.textInputContainer, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        //autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: "red",
  },
  textInputContainer: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "grey",
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: "pink",
  },
});
