import styled from "styled-components";
import { useQuery } from "react-query";
import { cointickers } from "../api";
import { useParams, Link } from 'react-router-dom';
import Price from "../components/Price";
import Chart from "../components/Chart";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  background-color: ${props => props.theme.bgColor}
`
const Leftpart = styled.div`
  width: 30%;
  height: 120vh;
  padding-top:10vh;
  
`
const Rightpart = styled(Leftpart)`
  width: 70%;
`
const Loader = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`
const CoinContainer = styled.ul`
  width: 100%;
  height: 100%;
  overflow-y : auto;
  padding: 30px 50px;
  font-weight: bold;
  font-size: 18px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`
const CoinList = styled.li`
  width: 100%;
  line-height: 60px;
  background-color: #fff;
  text-align: center;
  margin: 10px 0;
  position: relative;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  & img{
    width: 30px; height: 30px;
    position: absolute;
    left: 30px;
    top: 10px;
  }
`

interface ICoin {
  beta_value: number,
  circulating_supply: number,
  first_data_at: string,
  id: string,
  last_updated: string,
  max_supply: number,
  name: string,
  quotes: {
    USD: {
      ath_date: string,
      ath_price: number,
      market_cap: number,
      market_cap_change_24h: number,
      percent_change_1h: number,
      percent_change_1y: number,
      percent_change_6h: number,
      percent_change_7d: number,
      percent_change_12h: number,
      percent_change_15m: number,
      percent_change_24h: number,
      percent_change_30d: number,
      percent_change_30m: number,
      percent_from_price_ath: number,
      price: number,
      volume_24h: number,
      volume_24h_change_24h :number
    }
  },
  rank: number,
  symbol: string,
  total_supply: number
}

function Coin() {
  const {isLoading, data} = useQuery<ICoin[]>("allCoins", cointickers);

  const { id } = useParams()

  
    return (
      <>
        { isLoading 
          ? <Loader>Loading...</Loader>
          : (
          <Container>
            <Leftpart>
              <CoinContainer>
                {data?.slice(0,102).map((coin) => {
                  return (
                    <Link to={`/detail/${coin.id}`} key={coin.id}>
                    <CoinList style={ id===coin.id? { border : "5px solid red"} : { border : "5px solid #fff"}}>
                      <img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt={coin.name}/>
                      {coin.name}
                    </CoinList>
                    </Link>
                  )
                })}
              </CoinContainer>
            </Leftpart>
            <Rightpart>
              <Price coinId={id as string}></Price>
              <Chart coinId={id as string}></Chart>
            </Rightpart>
          </Container>
          )
        }
      </>
    )
}
export default Coin;