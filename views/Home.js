import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../dataStorage/auth-context';
import { BottomTabs } from "../components/ui/BottomTabs";

const HomeScreen = ({
    tabs
}) => {
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
        <>
    <View style={styles.rootContainer}>
        <Text style={styles.title}>Home!</Text>
        <Text>You authenticated successfully!</Text>
        <Text>{fetchedMessage}</Text>
        
    </View>
    <BottomTabs tabs={tabs} />
    </>
    );
}
export default HomeScreen;

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