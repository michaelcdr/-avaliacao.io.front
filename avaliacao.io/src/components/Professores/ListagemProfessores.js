import React, { Component } from 'react';
import { Table, Col, Container, Row } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from "react-router-dom";
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

class ListagemProfessores extends Component {
  constructor(props){
    super(props);
    this.state = {
        professores: []
    }
        
    this.token =  localStorage.getItem('@login-avaliacao.io/token');
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getProfessores = this.getProfessores.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  

  componentDidMount() {
    this.getProfessores();
  }

  async getProfessores() {
    await fetch(`${USERS_API_URL}Professores`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(body => {
        this.setState({ professores: body });
      })
      .catch(err => console.log(err));
  }

  async deleteItem(id) {
    await fetch(`${USERS_API_URL}Professores/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Access-Control-Allow-Origin' : '*' ,
        'Access-Control-Allow-Methods' : 'DELETE'
      }
    }).then(res => {
      const updated = this.state.professores.filter(professor => professor.id !== id);
      this.setState({ professores: updated })
    }).catch(err => console.log(err));
  }

  render() {
    const { professores } = this.state;
    return (
      <Container style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <h3>Professores</h3>
          </Col>
        </Row>
        <Row>
          <Col>
          <Table striped>
            <thead className="thead-light">
              <tr>
                <th>Nome do professor</th>
                <th>Username</th>
                <th style={{ textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {!professores || professores.length <= 0 ?
                <tr>
                  <td colSpan="6" align="center"><b>Não há professores cadastrados.</b></td>
                </tr>
                : professores.map(professor => (
                  <tr key={professor.id}>
                    <td>
                      {professor.nome}
                    </td>
                    <td>
                      {professor.userName}
                    </td>
                    <td align="center">
                      <div>
                        &nbsp;&nbsp;&nbsp;
                        <Link className="btn btn-outline-primary" to={`/professor/editar/${professor.id}`}>Editar</Link>{' '}
                        <ConfirmationModal color={'danger'} id={professor.id} confirm={this.deleteItem} message="Tem certeza que deseja deletar o professor?" buttonLabel="Deletar"/>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                <Link className="btn btn-success" to="/professores/cadastro">Cadastrar</Link>
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
export default ListagemProfessores;