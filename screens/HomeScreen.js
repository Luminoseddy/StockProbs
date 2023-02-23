import axios from 'axios';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, } from 'react-native';
import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { AuthContext } from '../dataStorage/auth-context';
import { fetchStock } from '../components/apiCalls/Stock';

// Screen only for authenticated users.
export default function HomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');
  authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  let openList = []
  let highList = []


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

// Fetch data from API
// ----------------------------------------------
  // const fetchData = useCallback(() => {
  //   fetchStock().then((data) => {
  //     //call data modifier n whatever is return call setData(modifiedData)
  //     for (var key in data['Time Series (Daily)']) {
  //       openList.push(data['Time Series (Daily)'][key]['1. open'])
  //       highList.push(data['Time Series (Daily)'][key]['2. high'])
  //       console.log(data['Time Series (Daily)'][key]['1. open']);// Prints all data of stock.
  //     }
  //     setData({
  //       open: openList,
  //       high: highList,
  //     })
  //     setLoading(false)
  //   }).catch((error) => console.log(error));

  // }, []);
  // useEffect(() => {
  //   if (!data) {
  //     fetchData()
  //   }
  // }, []);

  useEffect(() => {
    if (!isLoading && !data) {
      setLoading(true)
    }
  }, [isLoading, data]);

  const renderList = useMemo(() => {
    if (!!data) {
      // console.log(data)
      return Object.keys(data).map((property) => (
        <FlatList
          data={data[property]}
          // keyExtractor={item => item.id}
          renderItem={({ item }) => (

            <Text >
              ${item} 
            </Text>

          )}
        />))
    }
    return null;
  }, [data]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Home!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
      <View style={styles.listOfData}>
        {/* {isLoading ? (<ActivityIndicator animating={isLoading} />) : renderList} */}
      </View>
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
  listOfData: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: "space-around"
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