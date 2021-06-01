import React, { Component, Fragment } from 'react';
import AppHeader from './components/AppHeader';
import Home from './components/Home';
import CadastroDisciplina from './components/CadastroDisciplina';
import EdicaoDisciplina from './components/EdicaoDisciplina';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Route path='/edicao/:id' component={EdicaoDisciplina} />
        </Switch>
      </Router>  
    </Fragment>;
  }
}
export default App;