import React, { Component } from 'react';
import { Table, Col, Container, Row } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from "react-router-dom";

class ListagemDisciplinasProfessor extends Component {
  constructor(props){
    super(props);
    this.state = {
      disciplinas: [],
      disciplinasProfessor: [],
      disiplinasFiltered: []
    }

    this.userId = localStorage.getItem('@login-avaliacao.io/id');
    this.token = localStorage.getItem('@login-avaliacao.io/token');
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.filterDisciplinas = this.filterDisciplinas.bind(this);
    this.getDisciplinas = this.getDisciplinas.bind(this);
    this.getProfessor = this.getProfessor.bind(this);
  }

  componentDidMount() {
    this.getDisciplinas();
  }

  async getDisciplinas() {
    await fetch(`${USERS_API_URL}Disciplinas`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(disciplinas => {
        this.setState({ disciplinas: disciplinas });
        this.getProfessor();
      })
      .catch(err => console.log(err));
  }

  async getProfessor() {
    await fetch(`${USERS_API_URL}Professores/${this.userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(body => {
        this.setState({ disciplinasProfessor: body.disciplinas });
        this.filterDisciplinas();
      })
      .catch(err => console.log(err));
  }

  filterDisciplinas() {
    const { disciplinas, disciplinasProfessor } = this.state;
    let res = [];
    res = disciplinas.filter(el => {
      return disciplinasProfessor.find(element => {
        return element === el.id;
      });
    });
    this.setState({ disciplinasFiltered: res });
  }

  render() {
    const { disciplinasFiltered } = this.state;
    return (
      <Container style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <h3>Minhas disciplinas</h3>
          </Col>
        </Row>
        <Row>
          <Col>
          <Table striped>
            <thead className="thead-light">
              <tr>
                <th>Nome da disciplina</th>
                <th style={{ textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {!disciplinasFiltered || disciplinasFiltered.length <= 0 ?
                <tr>
                  <td colSpan="6" align="center"><b>Não há disciplinas cadastradas para você.</b></td>
                </tr>
                : disciplinasFiltered.map(disciplina => (
                  <tr key={disciplina.id}>
                    <td>
                      {disciplina.nome}
                    </td>
                    <td align="center">
                      <div>
                        &nbsp;&nbsp;&nbsp;
                        <Link className="btn btn-outline-primary" to={`/disciplinas/edicao/${disciplina.id}`}>Editar</Link>{' '}
                        <Link className="btn btn-primary" to={`/disciplinas/professor/${disciplina.id}`}>Alunos</Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default ListagemDisciplinasProfessor;