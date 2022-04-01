import { Route, Routes} from 'react-router-dom'
import Coin from './routes/Coin';
import Coins from './routes/Coins';

function Router(){
    return (
        
            <Routes>
                <Route path={`/`} element={<Coins/>}/>
                <Route path={`/detail`} element={<Coin />}/>
            </Routes>
    )
}
export default Router;