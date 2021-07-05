import React, { Component } from 'react';
import { Table, Col, Container, Row } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from "react-router-dom";
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

class ListagemAlunos extends Component {
  constructor(props){
    super(props);
    this.state = {
        alunos: []
    }
        
    this.token =  localStorage.getItem('@login-avaliacao.io/token');
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getAlunos = this.getAlunos.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  

  componentDidMount() {
    this.getAlunos();
  }

  async getAlunos() {
    await fetch(`${USERS_API_URL}Alunos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(body => {
        this.setState({ alunos: body });
      })
      .catch(err => console.log(err));
  }

  async deleteItem(id) {
    await fetch(`${USERS_API_URL}Alunos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Access-Control-Allow-Origin' : '*' ,
        'Access-Control-Allow-Methods' : 'DELETE'
      }
    }).then(res => {
      const updated = this.state.alunos.filter(aluno => aluno.id !== id);
      this.setState({ alunos: updated })
    }).catch(err => console.log(err));
  }

  render() {
    const { alunos } = this.state;
    return (
      <Container style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <h3>Alunos</h3>
          </Col>
        </Row>
        <Row>
          <Col>
          <Table striped>
            <thead className="thead-light">
              <tr>
                <th>Nome do aluno</th>
                <th>Matrícula</th>
                <th style={{ textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {!alunos || alunos.length <= 0 ?
                <tr>
                  <td colSpan="6" align="center"><b>Não há alunos cadastrados.</b></td>
                </tr>
                : alunos.map(aluno => (
                  <tr key={aluno.id}>
                    <td>
                      {aluno.nome}
                    </td>
                    <td>
                      {aluno.matricula}
                    </td>
                    <td align="center">
                      <div>
                        &nbsp;&nbsp;&nbsp;
                        <Link className="btn btn-outline-primary" to={`/alunos/editar/${aluno.id}`}>Editar</Link>{' '}
                        <ConfirmationModal color={'danger'} id={aluno.id} confirm={this.deleteItem} message="Tem certeza que deseja deletar o aluno?" buttonLabel="Deletar"/>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                <Link className="btn btn-success" to="/alunos/cadastro">Cadastrar</Link>
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
export default ListagemAlunos;