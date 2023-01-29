import { Pressable, Text, View, StyleSheet, Button } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();


// function MyDrawer() {
//   return (
//     <Drawer.Navigator useLegacyImplementation initialRouteName="MyProfile">

//     </Drawer.Navigator>
//   );
// }

// export default function HeaderLeftButton() {
//   console.log('here i am')
//   return (
//       <MyDrawer />
//   );
// }

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

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

