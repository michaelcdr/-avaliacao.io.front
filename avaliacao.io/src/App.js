import React, { Component, Fragment } from 'react';
import AppHeader from './components/AppHeader';
import Home from './components/Home';
import CadastroDisciplina from './components/CadastroDisciplina';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return  <Fragment>
      <AppHeader />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/cadastro">
            <CadastroDisciplina />
          </Route>
        </Switch>
      </Router>  
    </Fragment>;
  }
}
export default App;