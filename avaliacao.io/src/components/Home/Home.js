import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';

import ListagemDisciplinas from '../Disciplinas/ListagemDisciplinas';
import { USERS_API_URL } from '../../constants';

class Home extends Component {

  addUserToState = user => {
    this.setState(previous => ({
      items: [...previous.items, user]
    }));
  }
  
  render() {
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
}
export default Home;