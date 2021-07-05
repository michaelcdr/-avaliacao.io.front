import React, { Component } from 'react';
import { Table, Col, Container, Row } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from "react-router-dom";
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

class ListagemCoordenadores extends Component {
  constructor(props){
    super(props);
    this.state = {
        coordenadores: []
    }
        
    this.token =  localStorage.getItem('@login-avaliacao.io/token');
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getCoordenadores = this.getCoordenadores.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  

  componentDidMount() {
    this.getCoordenadores();
  }

  async getCoordenadores() {
    await fetch(`${USERS_API_URL}Coordenador`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(body => {
        this.setState({ coordenadores: body });
      })
      .catch(err => console.log(err));
  }

  async deleteItem(id) {
    await fetch(`${USERS_API_URL}Coordenador/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Access-Control-Allow-Origin' : '*' ,
        'Access-Control-Allow-Methods' : 'DELETE'
      }
    }).then(res => {
      const updated = this.state.coordenadores.filter(coordenador => coordenador.id !== id);
      this.setState({ coordenadores: updated })
    }).catch(err => console.log(err));
  }

  render() {
    const { coordenadores } = this.state;
    return (
      <Container style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <h3>Coordenadores</h3>
          </Col>
        </Row>
        <Row>
          <Col>
          <Table striped>
            <thead className="thead-light">
              <tr>
                <th>Nome do coordenador</th>
                <th>Username</th>
                <th style={{ textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {!coordenadores || coordenadores.length <= 0 ?
                <tr>
                  <td colSpan="6" align="center"><b>Não há coordenadores cadastrados.</b></td>
                </tr>
                : coordenadores.map(coordenador => (
                  <tr key={coordenador.id}>
                    <td>
                      {coordenador.nome}
                    </td>
                    <td>
                      {coordenador.userName}
                    </td>
                    <td align="center">
                      <div>
                        &nbsp;&nbsp;&nbsp;
                        <Link className="btn btn-outline-primary" to={`/coordenador/editar/${coordenador.id}`}>Editar</Link>{' '}
                        <ConfirmationModal color={'danger'} id={coordenador.id} confirm={this.deleteItem} message="Tem certeza que deseja deletar o coordenador?" buttonLabel="Deletar"/>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                <Link className="btn btn-success" to="/coordenadores/cadastro">Cadastrar</Link>
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
export default ListagemCoordenadores;