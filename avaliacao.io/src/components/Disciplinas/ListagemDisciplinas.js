import React, { Component } from 'react';
import { Table, Col, Container, Row } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from "react-router-dom";
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

class ListagemDisciplinas extends Component {
  state = {
    disciplinas: []
  }

  componentDidMount() {
    this.getDisciplinas();
  }

  async getDisciplinas() {
    await fetch(`${USERS_API_URL}Disciplinas`)
      .then(res => res.json())
      .then(res => this.setState({ disciplinas: res }))
      .catch(err => console.log(err));
  }

  async deleteItem(id) {
    await fetch(`${USERS_API_URL}Disciplinas/${id}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin' : '*' ,
        'Access-Control-Allow-Methods' : 'DELETE'
      }
    }).then(res => {
      const updated = this.state.disciplinas.filter(disciplina => disciplina.id !== id);
      this.setState({ disciplinas: updated })
    }).catch(err => console.log(err));
  }

  render() {
    const { disciplinas } = this.state;
    return (
      <Container style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <h3>Disciplinas</h3>
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
              {!disciplinas || disciplinas.length <= 0 ?
                <tr>
                  <td colSpan="6" align="center"><b>Não há disciplinas cadastradas.</b></td>
                </tr>
                : disciplinas.map(disciplina => (
                  <tr key={disciplina.id}>
                    <td>
                      {disciplina.nome}
                    </td>
                    <td align="center">
                      <div>
                        &nbsp;&nbsp;&nbsp;
                        <Link className="btn btn-outline-primary" to={`/disciplinas/edicao/${disciplina.id}`}>Editar</Link>{' '}
                        <ConfirmationModal color={'danger'} id={disciplina.id} confirm={this.deleteItem} message="Tem certeza que deseja deletar a disciplina?" buttonLabel="Deletar"/>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                <Link className="btn btn-primary" to="/disciplinas/cadastro">Cadastrar</Link>
                </td>
              </tr>        
            </tfoot>
          </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default ListagemDisciplinas;