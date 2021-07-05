import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Home extends Component {

  addUserToState = user => {
    this.setState(previous => ({
      items: [...previous.items, user]
    }));
  }
  
  render() {
    const nome = localStorage.getItem('@login-avaliacao.io/nome');
    return <Container style={{ paddingTop: "20px", textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
      <Container>
        <p style={{ alignSelf: 'center' }}>Bem-vindo {nome}!</p>
      </Container>
      <img src='logo.png' alt='avaliacao.io' />
    </Container>;
  }
}
export default Home;