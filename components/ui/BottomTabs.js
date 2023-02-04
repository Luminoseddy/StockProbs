import { View, Button, StyleSheet } from "react-native"

export const BottomTabs = ({
    tabs,
}) => {
    return (
        <View style={styles.container}>
            {
                tabs.map((t, index) => {
                    return (
                        <Button
                            title={t.title}
                            onPress={t.onPress}
                            key={index}
                        />
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        flexDirection: 'row',
        width: '100%', 
        // height: 50, 
        backgroundColor: '#FF9800', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom: 25,
       
    },
});