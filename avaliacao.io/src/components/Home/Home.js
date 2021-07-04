import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Redirect } from 'react-router';

import ListagemDisciplinas from '../Disciplinas/ListagemDisciplinas';
import { USERS_API_URL } from '../../constants';

class Home extends Component {

  addUserToState = user => {
    this.setState(previous => ({
      items: [...previous.items, user]
    }));
  }
  
  render() {
    const username = localStorage.getItem('@login-avaliacao.io/username');//tras o username armazenado
    if (username !== null) {
      return <Container style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <h3>Disciplinas</h3>
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <RegistrationModal isNew={true} addUserToState={this.addUserToState} /> */}
          </Col>
        </Row>
      </Container>;
    }
    //Se não tiver nenhum usuário armazenado (logado) abre o form de login
    return (
      <Redirect to="/login"/>
    );
    
  }
}
export default Home;