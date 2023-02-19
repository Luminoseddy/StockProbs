
export const fetchStock = () => {
  // const request = require('alphavantage');
  const API_KEY = 'ZCQ7KGUV5GXAZBC0';
  const StockSymbol = 'MSFT';
  const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

  return fetch(API_Call).then((response) => response.json())
}
