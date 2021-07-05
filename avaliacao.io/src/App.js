import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppHeader from './components/Home/AppHeader';
import Home from './components/Home/Home';

import Login from './components/Login/Login';

import ListagemDisciplinas from './components/Disciplinas/ListagemDisciplinas';
import EdicaoDisciplina from './components/Disciplinas/EdicaoDisciplina';
import CadastroDisciplina from './components/Disciplinas/CadastroDisciplina';

import Cadastros from './components/Cadastros/Cadastros';

import ListagemDisciplinasProfessor from './components/DisciplinasProfessor/ListagemDisciplinasProfessor';

class App extends Component {
  render() {
    const username = localStorage.getItem('@login-avaliacao.io/username');//tras o username armazenado

    if (username !== null) {
      return  <Fragment>
        <AppHeader />

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="professor/disciplinas" component={ListagemDisciplinasProfessor} />

            <Route exact path="/disciplinas" component={ListagemDisciplinas} />
            <Route path="/disciplinas/cadastro" component={CadastroDisciplina} />
            <Route path='/disciplinas/edicao/:id' component={EdicaoDisciplina} />

            <Route path='/cadastro' component={Cadastros} />
            
            <Route path='/login' component={Login} />
          </Switch>
        </Router>  
      </Fragment>;
    }

    return (
      <Login />
    );
  }
}
export default App;