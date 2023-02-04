import { View, Text } from "react-native";
import { BottomTabs } from "../components/ui/BottomTabs";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TopMovers({ navigation }) {
    const tabs = [{
        title: 'Home',
        onPress: () => navigation.navigate('Home')
    }, {
        title: 'Favorites',
        onPress: () => navigation.navigate('Favorites')
    }, {
        title: 'Explore',
        onPress: () => navigation.navigate('ExploreScreen')
    }]
    return (
        <SafeAreaView edges={['left', 'right']}>
            <View>
                <Text>Top movers today</Text>
            </View>
            <BottomTabs tabs={tabs} />
        </SafeAreaView>
    );
}