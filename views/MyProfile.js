import { View, Text } from "react-native";
import { BottomTabs } from "../components/ui/BottomTabs";

const MyProfile = ({
    tabs,
}) => {
    return (
        <View>
            <Text>Edit profile here</Text>
            <BottomTabs tabs={tabs} />
        </View>
    );
}

export default MyProfile;