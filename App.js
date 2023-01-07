import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ImageBackground, StyleSheet, Text } from 'react-native'

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import IconButton from './components/ui/IconButton';
import AuthContextProvider, { AuthContext } from './dataStorage/auth-context';
import { useContext } from 'react';

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
  const authCtx = useContext(AuthContext);
  return (
    // Screen displays authenticated users - users logged in.

    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#196719" },
        headerTintColor: 'orange',
        contentStyle: { backgroundColor: "#196719" },
      }}
    >

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress= {authCtx.logout} // called from auth-context.js
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {/* Screen Protection */}
      {/* wrap with {} to render it dynamically */}
      {/* If not authenticated (not true), render AuthStack */}
      {!authCtx.isAuthenticated && <AuthStack />}
      {/* If authenticated (true), render AuthStack */}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>

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

