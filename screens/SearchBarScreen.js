import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Item from '../dataStorage/Item';

export default class SearchBarScreen extends Component {
    state = {
        search: '',
    };

    filterList(list) {
        return list.filter(
            (listItem) =>
                listItem.ticker.toLowerCase().includes(this.state.search.toLowerCase()) ||
                listItem.companyName.toLowerCase().includes(this.state.search.toLowerCase()),
        );
    }

    render() {
        const list = [
            { ticker: 'MSFT', companyName: 'Microsoft', currMarketPrice: '$250.33', percentInPriceChange: '%3.72' },
            { ticker: 'APPL', companyName: 'Apple', currMarketPrice: '$150.41', percentInPriceChange: '%2.42' },
            { ticker: 'GOOG', companyName: 'Google', currMarketPrice: '$99.34', percentInPriceChange: '%0.32' },
            { ticker: 'TSLA', companyName: 'Tesla', currMarketPrice: '$193.11', percentInPriceChange: '%1.62' },
        ];

        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(search) => this.setState({ search })}
                    style={styles.searchBar}
                />
                <ScrollView style={styles.listOfItems}>
                    {this.filterList(list).map((listItem, index) => (
                        <Item key={index}
                            ticker={listItem.ticker}
                            companyName={listItem.companyName}
                            currMarketPrice={listItem.currMarketPrice}
                            percentInPriceChange={listItem.percentInPriceChange} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        alignItems: 'center',
        height: '100%',
    },
    listOfItems: {
        column: 4,
        height: 50,
        width: '100%'
    },
    searchBar: {
        fontSize: 24,
        margin: 10,
        width: '90%',
        height: 50,
        backgroundColor: 'white',
    },
});