import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

export default class Item extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.ticker}</Text>
        <Text style={styles.text}>{this.props.companyName}</Text>
        <Text style={styles.text}>{this.props.currMarketPrice}</Text>
        <Text style={styles.text}>{this.props.percentInPriceChange}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    alignItems: 'center',
    height: 90,
    marginBottom: 10,
    paddingLeft:25,
    paddingRight:25,
    flexDirection: 'row',
    justifyContent: 'space-between',  
  },
  text: {
    color: 'white',
    fontSize: 24,

  }
});


/* Display stock info: 
   { Ticker, Company Name, Current market price, 
     difference in percent: start: market open,  } */