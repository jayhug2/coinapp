import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa"
import { Link } from "react-router-dom";

const Headermenu = styled.header`
  width: 100%;
  height: 10vh;
  position: absolute;
  z-index:10;
  display: flex;
  justify-content: space-between;
  padding: 30px 50px;
  & h2{
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    font-style : italic;
    & b{
      color: #ff0000;
    }
  }
  & span{
    color: #fff;
    font-size: 2rem;
  }
`


function Header () {
  return(
    <Headermenu>
      <Link to={`/`}><h2>Today <b>Coins</b></h2></Link>
      <span><FaSun /></span>
    </Headermenu>
  )


}

export default Header;