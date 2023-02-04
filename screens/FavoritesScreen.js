
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Favorites() {

    function FavoritesDetailsScreen({ navigation }) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>
              Welcome to Favorites page!
            </Text>
            <Button
              onPress={() => navigation.navigate('TabA Details')}
              title="Go to TabA Details"
            />
          </View>
        );
      }
      function Details() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>
              Favorites Tab Details here!
            </Text>
          </View>
        );
      }
    return (
      <>
        <Stack.Screen name="Tab Favorites" component={FavoritesDetailsScreen} />
        <Stack.Screen name="Favorites Details" component={Details} />
      </>
    );
  }