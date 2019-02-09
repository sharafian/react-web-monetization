import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Details from './Details'
import Hidden from './Hidden'
import List from './List'

const App = () => <BrowserRouter>
  <Switch>
    <Route path='/details' component={Details} />
    <Route path='/hidden' component={Hidden} />
    <Route component={List} />
  </Switch>
</BrowserRouter>

export default App;
