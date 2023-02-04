import MyProfile from "../views/MyProfile";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyProfileStack({ navigation }) {
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
            <MyProfile tabs={tabs} />
        </SafeAreaView>
    );
}