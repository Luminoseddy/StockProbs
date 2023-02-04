import { StyleSheet } from 'react-native';
import HomeScreen from '../views/Home';

// Screen only for authenticated users.
export default function HomeScreenStack({ navigation }) {
  
  const tabs = [{
    title: 'Home',
    onPress: () => navigation.navigate('Home'),
  }, {
    title: 'Favorites',
    onPress: () => navigation.navigate('Favorites')
  }, {
    title: 'Explore',
    onPress: () => navigation.navigate('ExploreScreen')
  }]

  return (
      <HomeScreen tabs={tabs} />
  );
}

