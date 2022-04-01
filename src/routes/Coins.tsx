import {  useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { cointickers } from "../api";
import { useQuery } from "react-query";

const Container = styled.div`
  width: 100%;
`
const Nav = styled.nav`
  height: 60vh;
  background : linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url("https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80") no-repeat center/cover;
  position: relative;
`
const Title = styled.div`
  color: #fff;
  display: inline-block;
  width: 320px;
  font-weight: bold;
  position: absolute;
  top: 200px;
  left: 150px;
  & h1{
    font-size: 6rem;
    & b{
      color : #ff0000;
    }
  }
  & p{
    padding-top:10px;
    font-size:18px;
    font-style: italic;
  }
  @media screen and (max-width: 560px){
    left: 0; right: 0;
    margin: auto;
  }
`
const CoinList = styled.ul`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns : 1fr 1fr 1fr;
  list-style: none;
  color: #fff;
  text-align: center;

  @media screen and (max-width:1000px){
    grid-template-columns : 1fr 1fr;
  }
  @media screen and (max-width: 560px){
    grid-template-columns : 1fr;
  }
`
const CoinItem = styled.li`
  border-radius:5px;
  padding: 10px 0;
  margin: 20px;
  line-height: 40px;
  box-shadow : 0px 0px 10px 2px #666;
  & h3{
    font-size: 20px;
    font-weight: bold;
    & img{
      width:30px;
      height: 30px;
      margin-right: 10px;
      position: relative;
      top: 5px;
    }
  }
`
const Loader = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`
const ViewDetail = styled.div`
  width: 320px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 2rem;
  margin-top: 60px;
  text-decoration: underline;
  cursor: pointer;
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

function Coins() {
  const {isLoading, data} = useQuery<ICoin[]>("allCoins", cointickers);
    return (
      <Container>
        <Nav>
          <Title>
            <h1>Today<br/><b>Coins</b></h1>
            <p>오늘의 가치를 담는 코인 정보 사이트</p>
            <Link to={`/detail`}><ViewDetail>View Details</ViewDetail></Link>
          </Title>
        </Nav>
        {isLoading 
          ? <Loader>Loading...</Loader>
          :(
            <CoinList>        
              {data?.slice(0,102).map((coin) => {
                return (
                  <CoinItem key={coin.id}>
                    <h3><img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt={coin.name}/>{coin.name}</h3>
                    <p>{`$ ${Number(coin.quotes.USD.ath_price).toFixed(3)}`}</p>
                    <p style={coin.quotes.USD.percent_change_24h <0 ? {color:"#06f"} : {color:"red"}}>
                      {`Changed last 24H : ${coin.quotes.USD.percent_change_24h}%`}
                    </p>
                  </CoinItem>
                )
              })}
        </CoinList>
      )}
      </Container>
    )
}
export default Coins;