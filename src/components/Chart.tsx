import styled from 'styled-components';
import { useQuery } from "react-query";
import { coinHistory2 } from "../api";
import ReactApexChart from 'react-apexcharts';

const Container = styled.div`
    width: 90%;
    height: auto;
    background-color: #fff;
    border-radius: 5px;
    margin: 0 auto;
    padding: 20px 0;
    box-sizing: border-box;
    margin-top: 50px;
    border: 1px solid #ccc;
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


function Chart({coinId}:PriceProps) {
  const { isLoading, data } = useQuery(["ohlcv", coinId], () => coinHistory2(coinId));
    return (
      <Container>
        {isLoading? <Loader>Loading...</Loader>:(
          <ReactApexChart
            type="candlestick"
            series={[
              {
              data: data?.map((price:any) => [
                new Date(price.time_open).getTime(),
                price.open.toFixed(3), 
                price.high.toFixed(3),
                price.low.toFixed(3),
                price.close.toFixed(3),
              ]),
              },
            ]}
            options={{
              chart: {
                type: "candlestick",
                toolbar: {
                  show:false,
                },
                background: "transparent",
              },
              plotOptions:{
                candlestick:{
                  colors:{
                    upward:"#FF0000",
                    downward:"#3c90EB"
                  }
                }
              },
              xaxis: {
                type: "datetime",
                categories: data?.map((price:any) => price.time_close),
                labels: {
                  style: {
                    colors: '#000'
                  }
                }
              },
              title: {
                text: 'Monthly chart',
                align: 'left'
              }
            }}
          >


          </ReactApexChart>

        )

        }

      </Container>
    )
}

export default Chart;
