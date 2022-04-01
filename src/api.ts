
export function cointickers(){
    return fetch(`https://api.coinpaprika.com/v1/tickers`).then((response) => response.json());
}