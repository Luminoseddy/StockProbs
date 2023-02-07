import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Pressable, onPress, View, Button } from 'react-native';

// import Button from '../components/ui/Button';

import MyProfile from './MyProfileScreen';

export default function SettingsScreen({ navigation, children }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Button style={styles.buttons}
          onPress={() => navigation.navigate('MyProfile')}
          title="My Profile"
          color="#196719"
          accessibilityLabel="Learn more about this purple button"
        />

        <Button style={styles.buttons}
          onPress={SettingsScreen}
          title="About"
          color="#196719"
          accessibilityLabel="Learn more about this purple button"
        />
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: '#CCCCCC',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'space-between',

  }
});
