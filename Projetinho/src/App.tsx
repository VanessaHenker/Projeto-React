import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import './style.css'
import Home from './componets/home'
import Company from './componets/company'

function App() {
  return (
   <Router>
    <ul>
      <li>Home</li>
      <li>Contato</li>
    </ul>

    <Switch>
    <Route exact path = "/">
      <Home />
    </Route>

    <Route exact path = "/company">
      <Company />
    </Route>

    <Route exact path = "/contact">
      <Home />
    </Route>
    </Switch>
   </Router>

  )
}

export default App
