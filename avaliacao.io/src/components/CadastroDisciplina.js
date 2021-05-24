import React, { Component } from 'react';
import {  Container, Button, FormGroup, Label, Input,Form } from 'reactstrap';
import { USERS_API_URL } from '../constants';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class CadastroDisciplina extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      nome: '',
      descritivo: '',
      professores : [],
      items: [],
      redirect: false
    }

    this.setField = this.setField.bind(this);
    this.salvar = this.salvar.bind(this);
  }

  setField(event) {
    let {name: fieldName, value} = event.target;

    this.setState({
      [fieldName]: value
    });
  };

  componentDidMount(){
    this.obterProfessores();
  }

  obterProfessores() {
    fetch(USERS_API_URL + "professores")
      .then(res => res.json())
      .then(professoresResult => {
          this.setState({ professores: professoresResult });
        }
      )
      .catch(err => console.log(err));
  }

  salvar(e){
    e.preventDefault();
    fetch(`${USERS_API_URL}Disciplinas`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nome: this.state.nome,
          descritivo: this.state.descritivo,
          professores: []
      })
    })
      .then(() => {
        this.setState({ redirect: true });
        console.log(this.state);
        console.log('sucess');
      })
      .catch(err => console.log(err));
      
    //console.log(this.state);
  }

  render() {
    const { nome, descritivo, professores} = this.state;
    const redirect = this.state.redirect;

    if (redirect) {
      console.log('Entrou!');
      return <Redirect to="/"/>;
    }

    return <Container style={{ paddingTop: "20px" }}>
        <Form onSubmit={this.salvar}>
          <FormGroup>
            <Label for="nome">Nome:</Label>
            <Input onChange={this.setField} type="text" name="nome" placeholder="Informe o nome da disciplina" value={nome}/>
          </FormGroup>
          <FormGroup>
            <Label for="descritivo">Descritivo:</Label>
            <Input onChange={this.setField} type="textarea" name="descritivo" placeholder="Informe o descritivo da disciplina"/>
          </FormGroup>
          <FormGroup>
            <Label for="professores">Professores:</Label>
            <Input type="select" name="professores"  multiple> 
              {this.state.professores.map(opt => <option key={opt.id} value={opt.id}>{opt.nome}</option>)}
            </Input>
          </FormGroup>
          <Link className="btn btn-warning mr-2" to="/">Voltar</Link>
          <Button>Salvar</Button>
        </Form>
    </Container>;
  }
}
export default CadastroDisciplina;