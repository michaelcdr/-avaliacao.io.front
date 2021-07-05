import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppHeader from './components/Home/AppHeader';
import Home from './components/Home/Home';

import Login from './components/Login/Login';

import Avaliacao from './components/Avaliacao/Avaliacao';

import ListagemDisciplinas from './components/Disciplinas/ListagemDisciplinas';
import EdicaoDisciplina from './components/Disciplinas/EdicaoDisciplina';
import CadastroDisciplina from './components/Disciplinas/CadastroDisciplina';

import Cadastros from './components/Cadastros/Cadastros';

import ListagemDisciplinasProfessor from './components/DisciplinasProfessor/ListagemDisciplinasProfessor';
import ListagemAlunosDisciplina from './components/AlunosDisciplina/ListagemAlunosDisciplina';

import CadastroAluno from './components/Alunos/CadastroAluno';
import EdicaoAluno from './components/Alunos/EdicaoAluno';

import CadastroCoordenador from './components/Coordenadores/CadastroCoordenador';

import CadastroProfessor from './components/Professores/CadastroProfessor';
import EdicaoProfessor from './components/Professores/EdicaoProfessor';
import ListagemDisciplinasAluno from './components/DisciplinasAluno/ListagemDisciplinasAluno';
import AlunoNotas from './components/AlunoNotas/AlunoNotas';

class App extends Component {
  render() {
    const username = localStorage.getItem('@login-avaliacao.io/username');

    if (username !== null) {
      return  <Fragment>
        <AppHeader />

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path='/cadastro' component={Cadastros} />

            <Route exact path="/disciplinas/aluno" component={ListagemDisciplinasAluno} />
            <Route exact path="/aluno/notas/:alunoId/:disciplinaId" component={AlunoNotas} />
            <Route exact path="/alunos/cadastro" component={CadastroAluno} />
            <Route exact path="/alunos/edicao/:id" component={EdicaoAluno} />

            <Route exact path="/coordenadores/cadastro" component={CadastroCoordenador} />

            <Route exact path="/professores/cadastro" component={CadastroProfessor} />
            <Route exact path="/professores/edicao/:id" component={EdicaoProfessor} />

            <Route exact path="/disciplinas/professor" component={ListagemDisciplinasProfessor} />
            <Route exact path="/disciplinas/professor/:id" component={ListagemAlunosDisciplina} />

            <Route path="/alunos/avaliar/:alunoId/:disciplinaId" component={Avaliacao} />

            <Route exact path="/disciplinas" component={ListagemDisciplinas} />
            <Route path="/disciplinas/cadastro" component={CadastroDisciplina} />
            <Route path='/disciplinas/edicao/:id' component={EdicaoDisciplina} />
            
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