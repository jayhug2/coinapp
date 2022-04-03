
export function cointickers(){
    return fetch(`https://api.coinpaprika.com/v1/tickers`).then((response) => response.json());
}


export function coinHistory2(coinId:string){
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60*60*24*30;
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response) => response.json());
}
