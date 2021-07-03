import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppHeader from './components/Home/AppHeader';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import CadastroDisciplina from './components/Disciplinas/CadastroDisciplina';
import CadastroAluno from './components/Usuarios/CadastroAluno';
import CadastroProfessor from './components/Usuarios/CadastroProfessor';
import CadastroCoordenador from './components/Usuarios/CadastroCoordenador';
import EdicaoDisciplina from './components/Disciplinas/EdicaoDisciplina';
import EdicaoCompetencia from './components/Competencias/EdicaoCompetencia';
import ListagemDisciplinas from './components/Disciplinas/ListagemDisciplinas';


class App extends Component {
  render() {
    return  <Fragment>
      <AppHeader />
      <Login />

      <Router>
        <Switch>
          <Route exact path="/disciplinas" component={ListagemDisciplinas} />
          <Route path="/disciplinas/cadastro" component={CadastroDisciplina} />
          <Route path='/disciplinas/edicao/:id' component={EdicaoDisciplina} />
          <Route path='/competencias/edicao/:id' component={EdicaoCompetencia} />
          <Route path='/aluno/cadastro' component={CadastroAluno} />
          <Route path='/professor/cadastro' component={CadastroProfessor} />
          <Route path='/coordenador/cadastro' component={CadastroCoordenador} />
        </Switch>
      </Router>  
    </Fragment>;
  }
}
export default App;