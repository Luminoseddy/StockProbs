import axios from 'axios';

import { StyleSheet, Text, View } from 'react-native';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../dataStorage/auth-context';


// Screen only for authenticated users.
export default function HomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');

  authCtx = useContext(AuthContext);
  const token = authCtx.token;

  // execute when component is loaded - sends GET request
  // get data from 'message node' firebase
  useEffect(() => {
    // attaching token to outgoing request to proof token is authenticated to FB
    axios.get('https://stockprobs-9087b-default-rtdb.firebaseio.com/message.json?auth=' + token
    ).then((response) => {
      setFetchedMessage(response.data); // recieving text
      console.log(response.data);
    });
  }, [token]);
  return (




    <View style={styles.rootContainer}>
      <Text style={styles.title}>Home!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
     
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

// -- Home screen
// Top Movers
// Favorites
// News from list of favorites

// -- Explore Screen
// Search
// Button that adds to favorites
// Display current day status of stock
// Button that pops up a probability window