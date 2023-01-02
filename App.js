import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { View, ImageBackground, StyleSheet, Text } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();
const image = { uri: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" };

// Screen displays un-authenticated users. 
function AuthStack() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Stack.Navigator
          screenOptions={{
            animation: 'none',
            headerStyle: { backgroundColor: '#196719' },
            headerTintColor: 'blue',
            contentStyle: { backgroundColor: null },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator >
      </ImageBackground >
    </View>
  );
}

function AuthenticatedStack() {
  return (
    // Screen displays authenticated users.
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#196719" },
        headerTintColor: 'orange',
        contentStyle: { backgroundColor: "#196719" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});

