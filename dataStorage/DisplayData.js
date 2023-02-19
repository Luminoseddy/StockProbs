import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export const Item = ({
  ticker,
  companyName,
  currMarketPrice,
  percentInPriceChange
}) => {

  

  return (
  

    
    <View style={styles.container}>
      <Text style={styles.text}>${ticker}</Text>
      <Text style={styles.text}>{companyName}</Text>
      <Text style={styles.text}>${currMarketPrice}</Text>
      <Text style={styles.text}>%{percentInPriceChange}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    alignItems: 'center',
    height: 90,
    marginBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
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