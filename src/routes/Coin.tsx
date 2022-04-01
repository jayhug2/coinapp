import styled from "styled-components";
import { useQuery } from "react-query";
import { cointickers } from "../api";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
`
const Leftpart = styled.div`
  width: 25%;
  height: 100vh;
  padding-top:10vh;
`
const Rightpart = styled(Leftpart)`
  width: 75%;
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
`
const CoinList = styled.li`
  width: 100%;
  line-height: 60px;
  background-color: #fff;
  text-align: center;
  margin: 10px 0;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
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
                    <CoinList key={coin.id}>
                      <img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt={coin.name}/>
                      {coin.name}
                    </CoinList>
                  )
                })}
              </CoinContainer>
            </Leftpart>
            <Rightpart></Rightpart>
          </Container>
          )
        }
      
      
      </>
    )
}
export default Coin;