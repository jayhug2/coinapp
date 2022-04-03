import styled from "styled-components";
import { useQuery } from "react-query";
import { coinHistory2 } from "../api";

const Container = styled.div`
    width: 90%;
    height: auto;
    background-color: #fff;
    border-radius: 5px;
    margin: 0 auto;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    border: 1px solid #ccc;
`
const PriceInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    width: 25%;
    line-height: 35px;
    font-weight: bold;
    font-size:22px;
    & + & {
        border-left: 1px solid #ccc;
    }
    & span{
        color: #ff0000;
        font-size:16px;
    }
`
const Loader = styled.h2`
    width:100%;
    height:100%;
    font-size:1.5rem;
    font-weight:bold;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface PriceProps {
    coinId : string;
}



function Price({coinId}:PriceProps) {
    const { isLoading, data } = useQuery(["ohlcv", coinId], () => coinHistory2(coinId));
    return (
        <Container>
            {isLoading? <Loader>Loading...</Loader>:(
                <>
                <PriceInfo>    
                    <span>Coin</span>{coinId}
                    <span>Date</span>{data[30].time_open.substr(0,10)}
                </PriceInfo>
                <PriceInfo><span>Market Cap</span>{`$ ${data[6].market_cap.toLocaleString()}`}</PriceInfo>
                <PriceInfo>
                    <span>Open</span>{`$ ${data[30].open.toFixed(3)}`}
                    <span>Close</span>{`$ ${data[30].close.toFixed(3)}`}
                </PriceInfo>
                <PriceInfo>
                    <span>High</span>{`$ ${data[30].high.toFixed(3)}`}
                    <span>Low</span>{`$ ${data[30].low.toFixed(3)}`}
                </PriceInfo>
                </>
            )}
        </Container>
    )
}

export default Price;