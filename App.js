import 'react-native-gesture-handler';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ImageBackground, StyleSheet, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import HeaderRightButton from './components/ui/HeaderRightButton';
import AuthContextProvider, { AuthContext } from './dataStorage/auth-context';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();
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
          {/* Routers  */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator >
      </ImageBackground >
    </View>
  );
}

function MyProfile({ navigation }) {
  return (
    // <View style={styles.layout}>
    <View>
      <Text>Edit profile here</Text>
    </View>
  );
}
function TopMovers({ navigation }) {
  return (
    // <View style={styles.layout}>
    <View>
      <Text>Top movers today</Text>
    </View>
  );
}


function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{
      headerStyle: { backgroundColor: "#196719" },
      headerTintColor: 'orange',
      contentStyle: { backgroundColor: "#196719" },
    }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{
        headerRight: ({ tintColor }) => (
          <HeaderRightButton
            color={tintColor}
            size={24}
            onPress={authCtx.logout} // called from auth-context.js
          />
        )
      }} />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
      <Drawer.Screen name="TodaysTopMovers" component={TopMovers} />
    </Drawer.Navigator>);
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

function Root() {
  // Apply loading screen using state.
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  // provide function and dependencies array,   
  useEffect(() => {
    // returns a promise, the stored token retrieved from async storage
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        // If true, autolog and load app from where user last left off, 
        // else, start app from signup/login
        authCtx.authenticate(storedToken);
      }
      // wether token is found or not, we set loading to false afterwards
      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    // Needs loading screen here. 
    return "";
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <Root />
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

