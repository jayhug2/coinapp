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
    color: ${props => props.theme.textColor};
    font-style : italic;
    & b{
      color: #ff0000;
    }
  }
  & span{
    color: ${props => props.theme.toggleColor};
    font-size: 2rem;
  }
`
interface tg{
  toggleTheme: () => void
  isDark : boolean
}


function Header ({toggleTheme, isDark }:tg) {
  return(
    <Headermenu>
      <Link to={`/`}><h2>Today <b>Coins</b></h2></Link>
      <span onClick={toggleTheme}>{isDark?<FaSun /> : <FaMoon />}</span>
    </Headermenu>
  )


}

export default Header;