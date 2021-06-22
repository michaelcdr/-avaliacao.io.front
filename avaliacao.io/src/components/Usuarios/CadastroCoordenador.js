import React, { Component } from 'react';
import {  Container, Button, FormGroup, Label, Input,Form } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class CadastroCoordenador extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      nome: '',
      userName: '',
      email: '',
      senha: '',
      disciplinas : [],
      disciplinasResult: [],
      redirect: false
    }

    this.setField = this.setField.bind(this);
    this.salvar = this.salvar.bind(this);
  }

  salvar (e) {
    e.preventDefault();
    fetch(`${USERS_API_URL}Coordenador`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nome: this.state.nome,
          userName: this.state.userName,
          email: this.state.email,
          senha: this.state.senha,
      })
    })
    .then(res => res.json())
    .then((body) => {
        console.log(body);
        this.setState({ redirect: true });
        console.log('Sucess');
    })
      /*.then((obj) => {
        this.setState({ redirect: true });
        console.log(this.state);
        console.log('success');
      })*/
      .catch(err => console.log(err));
  }

  setField(event) {
    let {name: fieldName, value} = event.target;

    this.setState({
      [fieldName]: value
    });
  };


  render() {
    const { nome, userName, email, senha} = this.state;
    const redirect = this.state.redirect;

    if (redirect) {
      return <Redirect to="/"/>;
    }

    return <Container style={{ paddingTop: "20px" }}>
        <Form onSubmit={this.salvar}>
          <FormGroup>
            <Label for="nome">Nome:</Label>
            <Input onChange={this.setField} type="text" name="nome" placeholder="Informe o nome do coordenador" value={nome}/>
          </FormGroup>
          <FormGroup>
            <Label for="userName">Usuario:</Label>
            <Input onChange={this.setField} type="textarea" name="userName" placeholder="Informe o nome de usuário" value={userName}/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input onChange={this.setField} type="email" name="email" placeholder="Informe o email do usuário" value={email}/>
          </FormGroup>
          <FormGroup>
            <Label for="senha">Senha:</Label>
            <Input onChange={this.setField} type="email" name="senha" placeholder="Informe a senha do usuário" value={senha}/>
          </FormGroup>
          <Link className="btn btn-light mr-2" to="/">Voltar</Link>
          <Button color='success'>Salvar</Button>
        </Form>
    </Container>;
  }
}
export default CadastroCoordenador;