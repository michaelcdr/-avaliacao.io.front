import React, { Component } from 'react';
import {  Container, Button, FormGroup, Label, Input,Form } from 'reactstrap';
import { USERS_API_URL } from '../constants';
import { Link } from 'react-router-dom';

class CadastroCompetencia extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      nome: '',
      descritivo: '',
      disciplinaId : this.props.id
    }

    this.setField = this.setField.bind(this);
    this.salvar = this.salvar.bind(this);
  }

  salvar(e) {
    e.preventDefault();
    fetch(`${USERS_API_URL}Competencias`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nome: this.state.nome,
          descritivo: this.state.descritivo,
          disciplinaId: this.state.disciplinaId
      })
    })
      .then(() => {
        this.setState({ redirect: true });
        console.log(this.state);
        console.log('success');
      })
      .catch(err => console.log(err));
  }

  setField(event) {
    let {name: fieldName, value} = event.target;

    this.setState({
      [fieldName]: value
    });
  };

  render() {
    const { nome, descritivo } = this.state;

    return <Container style={{ paddingTop: "20px" }}>
        <Form onSubmit={this.salvar}>
          <FormGroup>
            <Label for="nome">Nome:</Label>
            <Input onChange={this.setField} type="text" name="nome" placeholder="Informe o nome da competência" value={nome}/>
          </FormGroup>
          <FormGroup>
            <Label for="descritivo">Descritivo:</Label>
            <Input onChange={this.setField} type="textarea" name="descritivo" placeholder="Informe o descritivo da competência" value={descritivo}/>
          </FormGroup>
          <Link className="btn btn-warning mr-2" to="/">Voltar</Link>
          <Button>Salvar</Button>
        </Form>
    </Container>;
  }
}

export default CadastroCompetencia;