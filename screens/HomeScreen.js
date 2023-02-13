import axios from 'axios';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../dataStorage/auth-context';

// Screen only for authenticated users.
export default function HomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');

  authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const API_KEY ="HTYs0D0MJ4S2if3jtVRkMyIp_7EZ5iZU"

  const getStocks = async () => {
    try {
      // fetch - https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=HTYs0D0MJ4S2if3jtVRkMyIp_7EZ5iZU
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (!isLoading && (!data || data.length < 1)) {
      setLoading(true)
      getStocks();
    }
  }, [getStocks, isLoading, data]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Home!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
      {isLoading ? (
        <ActivityIndicator animating={isLoading} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
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