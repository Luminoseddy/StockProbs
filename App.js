import 'react-native-gesture-handler';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ImageBackground, StyleSheet, Text, Button, SafeAreaView, ScrollView, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import HeaderRightButton from './components/ui/HeaderRightButton';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Favorites from './screens/FavoritesScreen';
import Home from './screens/HomeScreen';
import Explore from './screens/ExploreScreen';
import Settings from './screens/SettingsScreen';
import TopMovers from './screens/TopMoversScreen'
import AuthContextProvider, { AuthContext } from './dataStorage/auth-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyProfile from './screens/MyProfileScreen';

import { createStackNavigator } from '@react-navigation/stack'




const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator()
const DrawerStack = createDrawerNavigator()
const BottomStack = createBottomTabNavigator()

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

// function MyTabs() {
//   const authCtx = useContext(AuthContext);
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         tabBarStyle: { position: 'absolute' },
//         headerStyle: { backgroundColor: "#196719" },
//         headerTintColor: 'orange',
//         contentStyle: { backgroundColor: "#196719" },
//         headerRight: ({ tintColor }) => (
//           <HeaderRightButton
//             color={tintColor}
//             size={24}
//             onPress={authCtx.logout} // called from auth-context.js
//           />
//         )
//       }}
//     >
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Explore" component={Explore} />
//       <Tab.Screen name="Favorites" component={Favorites} />
//       <Tab.Screen name="Settings" component={Settings} />
//       <Tab.Screen name="MyProfile" component={MyProfile}
//         options={{
//           tabBarButton: () => null,
//           tabBarVisible: false //hide tab bar on this screen

//         }} />
//     </Tab.Navigator>
//   );
// }

// Drawer code
function AppDrawerStack() {
  return (
    <DrawerStack.Navigator drawerContent={props => <DrawerView {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#196719" },
        headerTintColor: 'orange',
        contentStyle: { backgroundColor: "#196719" },
        headerRight: ({ tintColor }) => (
          <HeaderRightButton
            color={tintColor}
            size={24}
            onPress={authCtx.logout} // called from auth-context.js
          />
        )
      }}>
      <DrawerStack.Screen name='Logo2Home' component={AppBottomStack} />
      <DrawerStack.Screen name='MyProfile' component={MyProfile} />
      <DrawerStack.Screen name='Settings' component={Settings} />


    </DrawerStack.Navigator>
  )
}
function DrawerView({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <Button
          title="Home"
          onPress={() => {
            navigation.reset({
              index: 1,
              routes: [
                { name: 'Home' },
              ],
            });
            navigation.navigate('Home')
          }
          }
        />

        <Button style={styles.buttons}
          onPress={() => navigation.navigate('MyProfile')}
          title="My Profile"
          color="#196719"

        />

        <Button style={styles.buttons}
          onPress={() => navigation.navigate('Settings')}
          title="Settings"
          color="#196719"

        />
      </ScrollView>
    </SafeAreaView>
  )
}

// Bottom Stack Part
function AppBottomStack({ navigation, route }) {
  return (
    <BottomStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <BottomStack.Screen
        name="Home"
        component={Home}

      />


      <BottomStack.Screen
        name="Favorites"
        component={Favorites}
      />

    </BottomStack.Navigator>
  )
}



function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="Logged in" component={AppDrawerStack} options={{ title: "Home", }} />
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

