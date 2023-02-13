import React, { useCallback, useState, } from 'react';
import { View, Text, TextInput, StyleSheet, Button, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Item } from '../dataStorage/DisplayData';

const data = [
    { ticker: 'MSFT', companyName: 'Microsoft', currMarketPrice: '250.33', percentInPriceChange: '3.72' },
    { ticker: 'APPL', companyName: 'Apple', currMarketPrice: '150.41', percentInPriceChange: '2.42' },
    { ticker: 'GOOG', companyName: 'Google', currMarketPrice: '99.34', percentInPriceChange: '0.32' },
    { ticker: 'TSLA', companyName: 'Tesla', currMarketPrice: '193.11', percentInPriceChange: '1.62' },
]

export const SearchBarScreen = () => {
    const [search, setSearch] = useState('');
    const [list, setList] = useState(data);
    const [toggle, setToggle] = useState(true);

    const renderList = useCallback(() => {
        let filtered = list.filter(
            (listItem) =>
                listItem.ticker.toLowerCase().includes(search.toLowerCase()) ||
                listItem.companyName.toLowerCase().includes(search.toLowerCase()))

        return filtered.map((listItem, index) => (
            <Item key={index}
                ticker={listItem.ticker}
                companyName={listItem.companyName}
                currMarketPrice={listItem.currMarketPrice}
                percentInPriceChange={listItem.percentInPriceChange} />
        ))
    }, [list, search]);// list/search dependencies

    const sortList = useCallback((key) => {
        let unsortedList = [...list];
        switch (key) {
            case 'Ticker':
                toggle ?
                    /* Sorts in alphabetical order, if A (second element) is less than B (first element), it should return 1 because 
                       we would want them to swap places, if A is smaller, it means it is higher in the alphabet (closer to the letter a)
                       therefore it should be one of the last elements in reverse alphabet order
                     */
                    unsortedList.sort((a, b) => (a.ticker) < (b.ticker) ? 1 : -1) :
                    /* Sorts in alphabetical order, if A (second element) is less than B (first element), it should return -1 because 
                       we would want them to swap places, if A is smaller, it means it is higher in the alphabet (closer to the letter a) */
                    unsortedList.sort((a, b) => (a.ticker) < (b.ticker) ? -1 : 1)
                break
            case 'Company':
                toggle ?
                    unsortedList.sort((a, b) => (a.companyName) < (b.companyName) ? 1 : -1) :
                    unsortedList.sort((a, b) => (a.companyName) < (b.companyName) ? -1 : 1)
                break
            case 'Price':
                toggle ?
                    unsortedList.sort((a, b) => (b.currMarketPrice) - (a.currMarketPrice)) :
                    unsortedList.sort((a, b) => (a.currMarketPrice) - (b.currMarketPrice))
                break
            case 'Change':
                toggle ?
                    unsortedList.sort((a, b) => (b.percentInPriceChange) - (a.percentInPriceChange)) :
                    unsortedList.sort((a, b) => (a.percentInPriceChange) - (b.percentInPriceChange))
                break
        }
        setList(unsortedList)
        setToggle(!toggle)
    }, [list, toggle]);

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={(s) => setSearch(s)}
                style={styles.searchBar}
            />
            <View style={styles.buttonsContainer}>
                <Button style={styles.button}
                    title="Ticker"
                    onPress={() => sortList('Ticker')}
                >

                </Button>
                <Button style={styles.buttons}
                    title="Company"
                    onPress={() => sortList('Company')}
                >
                </Button>
                <Button style={styles.buttons}
                    title="Price"
                    onPress={() => sortList('Price')}
                >

                </Button>
                <Button style={styles.buttons}
                    title="Change"
                    onPress={() => sortList('Change')}
                >

                </Button>
            </View>
            <ScrollView style={styles.listOfItems}>
                {renderList()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        alignItems: 'center',
        height: '100%',
    },
    listOfItems: {
        width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 25,
        paddingRight: 25,

    },
    buttons: {

    },
    searchBar: {
        fontSize: 24,
        margin: 10,
        width: '90%',
        height: 50,
        backgroundColor: 'white',
    },
});