import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import Cart from './Components/Cart'
import Payment from './Components/Payment'
import NotFound from './Components/NotFound'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/Payment" component={Payment} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
